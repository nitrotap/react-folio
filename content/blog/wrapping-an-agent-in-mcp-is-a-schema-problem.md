---
title: "Wrapping an agent in MCP is a schema problem"
date: "2026-05-12"
description: "Exposing a LangChain agent over the Model Context Protocol. The transport is the easy half — the contract is a JSON Schema read by a model that will take every field in it literally."
tags: ["mcp", "langchain", "agents", "python"]
draft: false
---

An MCP server turns your agent into a tool that another model can call. That framing sounds like plumbing and mostly isn't, because of who the caller is.

Nobody reads your README. A language model reads your `inputSchema`, decides from the `description` string whether this tool is the right one, fills in the arguments, and takes whatever comes back at face value. Every affordance you want it to have must be in the schema. Everything in the schema is an affordance it will use.

So the schema is the API. The rest is transport.

This is a design read on a skeleton implementation — the agent invocation is commented out and the responses are simulated. Treat the code as shape, not as a benchmark.

## The input side

Tool declaration is the entire discovery surface:

```python
Tool(
    name="query_agent",
    description="Query the LangChain agent with structured output",
    inputSchema={
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "The query to send to the agent"
            },
            "output_format": {
                "type": "string",
                "enum": ["json", "structured"],
                "description": "Output format preference",
                "default": "structured"
            },
            "include_sources": {
                "type": "boolean",
                "description": "Include source references",
                "default": False
            }
        },
        "required": ["query"]
    }
)
```

The parts that do work here are `enum`, `default`, and `required`. An enum is the only thing that stops a caller inventing a fourth output format and getting a stack trace. A default is the difference between an optional parameter and a parameter the model has to guess at. `required` is the smallest contract you can write.

The part that does the most work is `description`, and it is a plain string with no validation on it whatsoever. It is prompt text. Whether the calling model reaches for `query_agent` or for one of the fifty other tools in its context is decided by that sentence, and there is no type system anywhere near it.

The second declared tool, `agent_status`, takes an empty object and no required fields. That is a good pattern — a zero-argument probe a client can call to check you are alive before committing to real work.

## The output side, and one field worth arguing about

Responses go through a Pydantic model:

```python
class StructuredOutput(BaseModel):
    """Define your structured output schema"""
    result: str
    metadata: Dict[str, Any]
    confidence: Optional[float] = None
    sources: Optional[List[str]] = None
```

Three of those four I would keep. `result` is the answer. `metadata` catches the intermediate steps and the original query, which is what you want when you are reading logs at 2am. `sources` is optional and gated by `include_sources`, which is honest — it is present when it is present.

`confidence` is the one to think about. In the reference handler it is set like this:

```python
confidence=0.85,  # You might calculate this from your agent
```

A constant, with a comment admitting it.

In a demo that would be unremarkable. In a tool schema it isn't, because a field in the output is a promise, and the entity reading it is a model that has been trained on the idea that a number labelled `confidence` means something. It has no way to tell a calibrated score from `0.85`. It will weight the answer accordingly, and if this tool sits alongside others in a routing decision, that constant is now silently participating in the routing.

`Optional[float] = None` is the right type. `None` is a truthful value. A hardcoded 0.85 is not. If nothing in the agent computes a confidence, do not emit the field — omitting it is the strictly more informative behaviour.

The same criticism applies to the `agent_status` response, which reports a fixed capability list of `text_generation`, `question_answering`, and `document_analysis` and a version of `1.0.0`. Status endpoints that cannot fail are decoration.

## The transport is where the SDK stops helping

Two options in the implementation, and the gap between them is instructive.

Over stdio, the whole thing is:

```python
from mcp.server.stdio import stdio_server
async with stdio_server() as (read_stream, write_stream):
    await self.server.run(
        read_stream,
        write_stream,
        InitializationOptions(
            server_name="langchain-mcp-server",
            server_version="1.0.0",
            capabilities={}
        )
    )
```

The SDK owns the protocol. You never see a JSON-RPC frame.

Over WebSocket, you do:

```python
if request_data.get("method") == "tools/list":
    tools = await self.list_tools(ListToolsRequest())
    response = {"jsonrpc": "2.0", "id": request_data.get("id"), "result": tools.model_dump()}
elif request_data.get("method") == "tools/call":
    ...
else:
    response = {"jsonrpc": "2.0", "id": request_data.get("id"),
                "error": {"code": -32601, "message": "Method not found"}}
```

Method dispatch by string comparison. Hand-written `-32601` for unknown methods and `-32700` for a `JSONDecodeError`. The source's own comment on this block says it is a simplified version and that you would need to properly handle the JSON-RPC protocol — which is exactly right, and is the actual price of network reach. Going remote does not add a transport to your MCP server. It transfers ownership of the protocol from the SDK to you, including batching, notifications, and initialisation, none of which the string comparison above handles.

If you can live on the same host, live on the same host.

## What the config file is really saying

For the stdio path, clients find you through an entry like this:

```json
{
  "mcpServers": {
    "langchain-agent": {
      "command": "python",
      "args": ["path/to/your/mcp_server.py"],
      "env": { "PYTHONPATH": "/path/to/your/project" }
    }
  }
}
```

Worth reading that as what it is. There is no port, no URL, no handshake. Discovery is a command line, and the client starts your process. "Deploying" a stdio MCP server means putting a Python file somewhere a client is configured to execute, in an environment you specified with `PYTHONPATH`.

That is a perfectly good deployment model — it inherits the client's process isolation and needs no network surface at all. It is also not a deployment model that any network-level policy will ever see, which is worth knowing before you assume something upstream is watching the calls.

## Error handling as protocol

One thing the implementation gets right and I would copy:

```python
except Exception as e:
    return CallToolResult(
        content=[TextContent(type="text", text=f"Error: {str(e)}")],
        isError=True
    )
```

An exception becomes a result with `isError=True`, not a crashed server. This matters more here than in an ordinary API, because the caller is a model that can recover — given a legible error string it will often fix its arguments and retry. Given a dropped connection it can only fail. `isError` is part of the contract too.

## The short version

There are exactly two schemas that matter: the one describing what a model may ask you for, and the one describing what you promise back. Both are read by something with no judgement about which fields you meant seriously.

So put the enums and the defaults in. Leave the fields you cannot compute out. Everything else — stdio versus WebSocket, streaming, temperature, which library holds the agent — is transport, and transport is the part that already has a specification.
