# Building an MCP Server for LangChain Agents: A Complete Guide

This document provides a comprehensive, literate programming approach to creating a Model Context Protocol (MCP) server that exposes LangChain agent functionality to other Large Language Models through structured outputs.

## Table of Contents

1. [Introduction to MCP and LangChain Integration](#introduction)
2. [Core MCP Server Implementation](#core-server)
3. [WebSocket-Based MCP Server](#websocket-server)
4. [Configuration Management](#configuration)
5. [Client Implementation](#client)
6. [Complete Integration Example](#integration)

## 1. Introduction to MCP and LangChain Integration {#introduction}

The Model Context Protocol (MCP) is a standardized way for AI systems to discover and interact with external tools and data sources. By wrapping a LangChain agent in an MCP server, we enable other LLMs to leverage our agent's capabilities through a well-defined interface.

Our implementation consists of several key components:
- **MCP Server**: Exposes LangChain agent functionality as MCP tools
- **Structured Outputs**: Ensures consistent, parseable responses
- **Transport Layer**: Handles communication (stdio or WebSocket)
- **Client Interface**: Demonstrates how other systems connect

## 2. Core MCP Server Implementation {#core-server}

The foundation of our system is a Python-based MCP server that wraps a LangChain agent. Let's examine each section of the implementation:

### 2.1 Dependencies and Imports

```python
#!/usr/bin/env python3

import asyncio
import json
from typing import Any, Dict, List, Optional
from pydantic import BaseModel

from mcp.server.models import InitializationOptions
from mcp.server import NotificationOptions, Server
from mcp.server.models import (
    CallToolRequest,
    CallToolResult,
    ListToolsRequest,
    ListToolsResult,
    Tool,
    TextContent
)
from mcp.types import JSONRPCMessage, JSONRPCRequest, JSONRPCResponse

# Import your LangChain agent
# from your_module import your_langchain_agent
```

**Purpose**: This section imports all necessary dependencies for our MCP server:
- `asyncio`: For asynchronous programming support
- `json`: For JSON serialization/deserialization
- `pydantic.BaseModel`: For structured data validation
- MCP SDK components: Core server functionality and message types
- Placeholder for LangChain agent import

### 2.2 Structured Output Schema

```python
class StructuredOutput(BaseModel):
    """Define your structured output schema"""
    result: str
    metadata: Dict[str, Any]
    confidence: Optional[float] = None
    sources: Optional[List[str]] = None
```

**Purpose**: This Pydantic model defines the structure of responses from our agent. By using a consistent schema, we ensure that other LLMs can reliably parse and understand the agent's outputs. The schema includes:
- `result`: The main response content
- `metadata`: Additional context and processing information
- `confidence`: Optional confidence score for the response
- `sources`: Optional list of source documents or references

### 2.3 Main Server Class Definition

```python
class LangChainMCPServer:
    def __init__(self, langchain_agent):
        self.agent = langchain_agent
        self.server = Server("langchain-mcp-server")
        
        # Register handlers
        self.server.list_tools = self.list_tools
        self.server.call_tool = self.call_tool
```

**Purpose**: The main server class initializes the MCP server and registers handler methods. The constructor:
- Stores a reference to the LangChain agent
- Creates an MCP server instance with a unique name
- Registers callback methods for tool listing and execution

### 2.4 Tool Discovery Implementation

```python
async def list_tools(self, request: ListToolsRequest) -> ListToolsResult:
    """Define the tools/endpoints your agent exposes"""
    return ListToolsResult(
        tools=[
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
            ),
            Tool(
                name="agent_status",
                description="Get agent status and capabilities",
                inputSchema={
                    "type": "object",
                    "properties": {},
                    "required": []
                }
            )
        ]
    )
```

**Purpose**: This method defines the tools (endpoints) that our server exposes to client LLMs. Each tool includes:
- A unique name for identification
- Human-readable description
- JSON Schema defining input parameters and validation rules

The `query_agent` tool accepts queries with optional formatting preferences, while `agent_status` provides system information without parameters.

### 2.5 Tool Execution Handler

```python
async def call_tool(self, request: CallToolRequest) -> CallToolResult:
    """Handle tool calls from other LLMs"""
    try:
        if request.name == "query_agent":
            return await self._handle_agent_query(request.arguments)
        elif request.name == "agent_status":
            return await self._handle_agent_status(request.arguments)
        else:
            raise ValueError(f"Unknown tool: {request.name}")
            
    except Exception as e:
        return CallToolResult(
            content=[TextContent(
                type="text",
                text=f"Error: {str(e)}"
            )],
            isError=True
        )
```

**Purpose**: This method routes tool calls to appropriate handlers based on the tool name. It includes comprehensive error handling that returns structured error responses rather than crashing the server.

### 2.6 Agent Query Processing

```python
async def _handle_agent_query(self, arguments: Dict[str, Any]) -> CallToolResult:
    """Process agent query and return structured output"""
    query = arguments.get("query", "")
    output_format = arguments.get("output_format", "structured")
    include_sources = arguments.get("include_sources", False)
    
    # Run your LangChain agent
    # This is where you'd call your actual agent
    # result = await self.agent.arun(query)  # or however you invoke your agent
    
    # For demonstration, simulating agent response
    agent_response = {
        "answer": "This is the agent's response to: " + query,
        "intermediate_steps": ["step1", "step2"],
        "sources": ["source1.pdf", "source2.txt"] if include_sources else None
    }
    
    # Structure the output
    if output_format == "structured":
        structured_result = StructuredOutput(
            result=agent_response["answer"],
            metadata={
                "intermediate_steps": agent_response["intermediate_steps"],
                "query": query
            },
            confidence=0.85,  # You might calculate this from your agent
            sources=agent_response["sources"]
        )
        
        response_text = structured_result.model_dump_json(indent=2)
    else:
        response_text = json.dumps(agent_response, indent=2)
    
    return CallToolResult(
        content=[TextContent(
            type="text", 
            text=response_text
        )]
    )
```

**Purpose**: This is the core method that processes queries sent to our LangChain agent. The implementation:
1. Extracts parameters from the request
2. Calls the LangChain agent (placeholder shown for demonstration)
3. Formats the response according to the requested output format
4. Returns a structured CallToolResult

The method demonstrates how to integrate your actual LangChain agent by replacing the simulation with real agent calls.

### 2.7 Status Information Handler

```python
async def _handle_agent_status(self, arguments: Dict[str, Any]) -> CallToolResult:
    """Return agent status and capabilities"""
    status = {
        "status": "active",
        "capabilities": [
            "text_generation",
            "question_answering", 
            "document_analysis"
        ],
        "version": "1.0.0",
        "supported_formats": ["json", "structured"]
    }
    
    return CallToolResult(
        content=[TextContent(
            type="text",
            text=json.dumps(status, indent=2)
        )]
    )
```

**Purpose**: This method provides system status and capability information. It's useful for client applications to understand what the agent can do and verify it's functioning correctly.

### 2.8 Server Runtime

```python
async def run(self, transport_uri: str = "stdio"):
    """Run the MCP server"""
    if transport_uri == "stdio":
        # For stdio transport
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
    else:
        # For other transports (WebSocket, HTTP, etc.)
        # You'll need to implement the appropriate transport
        pass

# Example usage
async def main():
    # Initialize your LangChain agent here
    # langchain_agent = YourLangChainAgent()
    
    # Create and run MCP server
    mcp_server = LangChainMCPServer(langchain_agent=None)  # Replace None with your agent
    await mcp_server.run()

if __name__ == "__main__":
    asyncio.run(main())
```

**Purpose**: The run method handles server startup and transport configuration. It supports stdio transport (for local integration) and provides a framework for other transports like WebSocket or HTTP.

## 3. WebSocket-Based MCP Server {#websocket-server}

For scenarios where network access is required, we provide a WebSocket-based implementation that allows remote LLMs to connect to our agent.

### 3.1 WebSocket Server Dependencies

```python
#!/usr/bin/env python3

import asyncio
import json
import logging
from typing import Any, Dict
import websockets
from websockets.server import WebSocketServerProtocol

from mcp.server.models import InitializationOptions
from mcp.server import Server
from mcp.server.models import (
    CallToolRequest,
    CallToolResult,
    ListToolsRequest,
    ListToolsResult,
    Tool,
    TextContent
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

**Purpose**: This section imports WebSocket-specific dependencies and sets up logging for the network-enabled server. The `websockets` library provides async WebSocket server capabilities.

### 3.2 WebSocket Server Class

```python
class WebSocketMCPServer:
    def __init__(self, langchain_agent, host="localhost", port=8765):
        self.agent = langchain_agent
        self.host = host
        self.port = port
        self.server = Server("langchain-websocket-server")
        
        # Register handlers
        self.server.list_tools = self.list_tools
        self.server.call_tool = self.call_tool
```

**Purpose**: The WebSocket server class extends the basic MCP server with network configuration. It accepts host and port parameters for flexible deployment.

### 3.3 Enhanced Tool Definitions

```python
async def list_tools(self, request: ListToolsRequest) -> ListToolsResult:
    return ListToolsResult(
        tools=[
            Tool(
                name="query_agent",
                description="Query the LangChain agent via WebSocket",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "The query to process"
                        },
                        "stream": {
                            "type": "boolean", 
                            "description": "Enable streaming responses",
                            "default": False
                        },
                        "temperature": {
                            "type": "number",
                            "description": "Temperature for response generation",
                            "default": 0.7,
                            "minimum": 0,
                            "maximum": 1
                        }
                    },
                    "required": ["query"]
                }
            )
        ]
    )
```

**Purpose**: The WebSocket version includes enhanced parameters like streaming support and temperature control, demonstrating how to expose more sophisticated agent capabilities.

### 3.4 WebSocket Query Handler

```python
async def _handle_websocket_query(self, arguments: Dict[str, Any]) -> CallToolResult:
    query = arguments.get("query", "")
    stream = arguments.get("stream", False)
    temperature = arguments.get("temperature", 0.7)
    
    # Process with your LangChain agent
    # response = await self.agent.arun(
    #     query, 
    #     callbacks=[...] if stream else None,
    #     temperature=temperature
    # )
    
    # Simulated structured response
    response = {
        "answer": f"Processed query: {query}",
        "parameters": {
            "temperature": temperature,
            "streaming": stream
        },
        "metadata": {
            "processing_time": "1.23s",
            "tokens_used": 150,
            "model": "gpt-4"
        }
    }
    
    return CallToolResult(
        content=[TextContent(
            type="text",
            text=json.dumps(response, indent=2)
        )]
    )
```

**Purpose**: This handler demonstrates how to pass advanced parameters to your LangChain agent, including streaming callbacks and generation parameters.

### 3.5 WebSocket Connection Handler

```python
async def handle_client(self, websocket: WebSocketServerProtocol, path: str):
    """Handle WebSocket client connections"""
    logger.info(f"Client connected from {websocket.remote_address}")
    
    try:
        async for message in websocket:
            try:
                # Parse JSON-RPC message
                request_data = json.loads(message)
                logger.info(f"Received request: {request_data}")
                
                # Process the request through MCP server
                # This is a simplified version - you'd need to properly
                # handle JSON-RPC protocol here
                
                if request_data.get("method") == "tools/list":
                    tools = await self.list_tools(ListToolsRequest())
                    response = {
                        "jsonrpc": "2.0",
                        "id": request_data.get("id"),
                        "result": tools.model_dump()
                    }
                
                elif request_data.get("method") == "tools/call":
                    params = request_data.get("params", {})
                    call_request = CallToolRequest(
                        name=params.get("name"),
                        arguments=params.get("arguments", {})
                    )
                    result = await self.call_tool(call_request)
                    response = {
                        "jsonrpc": "2.0", 
                        "id": request_data.get("id"),
                        "result": result.model_dump()
                    }
                
                else:
                    response = {
                        "jsonrpc": "2.0",
                        "id": request_data.get("id"),
                        "error": {
                            "code": -32601,
                            "message": "Method not found"
                        }
                    }
                
                await websocket.send(json.dumps(response))
                
            except json.JSONDecodeError:
                error_response = {
                    "jsonrpc": "2.0",
                    "id": None,
                    "error": {
                        "code": -32700,
                        "message": "Parse error"
                    }
                }
                await websocket.send(json.dumps(error_response))
                
    except websockets.exceptions.ConnectionClosed:
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Error handling client: {e}")
```

**Purpose**: This method handles individual WebSocket client connections. It:
1. Logs connection events for monitoring
2. Parses incoming JSON-RPC messages
3. Routes requests to appropriate MCP handlers
4. Returns properly formatted JSON-RPC responses
5. Handles connection errors and malformed requests gracefully

### 3.6 WebSocket Server Startup

```python
async def start_server(self):
    """Start the WebSocket server"""
    logger.info(f"Starting WebSocket MCP server on {self.host}:{self.port}")
    
    async with websockets.serve(
        self.handle_client,
        self.host,
        self.port,
        ping_interval=20,
        ping_timeout=10
    ):
        logger.info("WebSocket MCP server is running...")
        await asyncio.Future()  # Run forever

# Example usage
async def main():
    # Initialize your LangChain agent
    # langchain_agent = YourLangChainAgent()
    
    server = WebSocketMCPServer(
        langchain_agent=None,  # Replace with your agent
        host="0.0.0.0",  # Listen on all interfaces
        port=8765
    )
    
    await server.start_server()

if __name__ == "__main__":
    asyncio.run(main())
```

**Purpose**: The server startup method configures and launches the WebSocket server with appropriate health check settings (ping intervals) and runs indefinitely to handle client connections.

## 4. Configuration Management {#configuration}

### 4.1 MCP Server Configuration

```json
{
  "mcpServers": {
    "langchain-agent": {
      "command": "python",
      "args": ["path/to/your/mcp_server.py"],
      "env": {
        "PYTHONPATH": "/path/to/your/project"
      }
    }
  }
}
```

**Purpose**: This JSON configuration file defines how MCP clients should launch and connect to our server. It specifies:
- Server identifier (`langchain-agent`)
- Command to execute the server
- Command-line arguments
- Environment variables needed for proper Python path resolution

This configuration enables other LLM systems to automatically discover and connect to our LangChain agent server.

## 5. Client Implementation {#client}

To demonstrate how other systems would interact with our MCP server, we provide a complete client implementation.

### 5.1 Client Dependencies and Setup

```python
#!/usr/bin/env python3

import asyncio
import json
import websockets
from typing import Dict, Any

class MCPClient:
    def __init__(self, server_uri: str):
        self.server_uri = server_uri
        self.websocket = None
        self.request_id = 0
```

**Purpose**: The client class manages connections to our MCP server. It tracks the server URI, WebSocket connection, and maintains request IDs for JSON-RPC protocol compliance.

### 5.2 Connection Management

```python
async def connect(self):
    """Connect to the MCP server""
