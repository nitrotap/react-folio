---
title: "Most automation is a query on a timer"
date: "2026-02-10"
description: "Jira and Confluence automation rules are sold as Trigger, Condition, Action. Count the real ones and the trigger turns out to be the least interesting part."
tags: ["jira", "confluence", "automation", "jql"]
draft: false
---

Automation rules in Jira and Confluence have one shape: **Trigger → Condition(s) → Action(s)**. Something happens, you check whether it matters, you do something about it.

I keep notes on the rules worth keeping. Going back through the Jira ones, four out of five had the same trigger.

```
Trigger: Scheduled (daily at 9 AM)
Condition: JQL Query
JQL: priority = Critical AND status not in (Done, Closed) AND updated <= -2d
Action: Send email to project lead
```

That is not event-driven anything. It is a saved search on a cron. The trigger carries no information — a clock ticked. Every bit of logic in the rule lives in one line of JQL, and the action is a single call at the end.

Same for auto-closing resolved issues, `status = Resolved AND updated <= -7d AND resolution is not EMPTY`. Same for sprint cleanup, `Sprint in openSprints() AND status = "To Do" AND assignee is EMPTY AND created <= -3d`. Same for code review nags, `status = "Code Review" AND updated <= -2d AND assignee in membersOf("developers")`.

Once you see it, the rule builder starts looking like the wrong mental model. You're not writing a workflow. You're writing a query and choosing how often to run it.

## Why the scheduled version is usually the right one

The obvious objection is latency. An event trigger fires the moment an issue is created; a daily schedule fires up to twenty-four hours late. If you genuinely need the response now, use the event.

Most of the time you don't, and you get three things back for the delay.

**A scheduled rule cannot recurse.** This is the big one. The standard advice about automation is to be careful with rules that modify the same fields they monitor, use conditions to prevent recursive execution, and consider rule execution order. Which is correct, and worth noticing what kind of advice it is: nothing in the system checks any of it. There is no type checker for "this Edit Issue action re-triggers the Issue Updated rule that produced it." The only thing standing between you and a loop is a condition you remembered to write, in a rule someone else may edit next quarter. A clock-triggered rule has no such failure mode. It runs N times a day regardless of what it does.

**A scheduled rule has a knowable cost.** Jira Cloud allows 1000 rules per site and 100 executions per rule per month, varying by plan; Confluence Cloud is 1000 rules per site with plan-based execution limits. Server and Data Center have no built-in limits, but performance considerations still apply. A daily rule costs about thirty executions a month and you know that before you deploy it. An `Issue Updated` rule costs whatever your team happens to do in October.

**A scheduled rule is readable.** The JQL is the whole specification. You can paste it into the issue navigator and see exactly the set the rule will act on, right now, before it acts on anything. There is no equivalent for "what would this event rule have done last Tuesday."

## The query is the program

Which makes the query language the thing actually worth learning, and JQL is more expressive than most people who use it daily realise.

It has history, not just state:

```jql
status changed from "To Do" to "In Progress" by currentUser()
status changed to "Done" during (-1w, now())
assignee changed after "-2d"
```

It has agile-aware functions that resolve against live board state:

```jql
Sprint in openSprints()
Sprint in closedSprints() AND Sprint not in futureSprints()
fixVersion in unreleasedVersions()
```

It has group membership, so a rule can target a role rather than a list of names that goes stale — `assignee in membersOf("jira-developers")`, `reporter in membersOf("developers")`. And it has relative dates everywhere, which is what makes staleness expressible at all: `updated <= -7d`, `created <= endOfMonth(-1)`, `created >= startOfYear()`.

Put those together and a rule like "in-progress work nobody has touched in a week" is one clause, `status = "In Progress" AND updated <= -1w AND assignee != EMPTY`, and it will still mean the same thing in two years.

CQL on the Confluence side is the same idea with different nouns. `space = "DOCS" AND lastmodified <= -90d AND status = current AND type = page` is a documentation review queue. `label is null AND space = "PROJ" AND type = page` finds content nobody categorised. `ancestor = "Meeting Notes" AND created >= startOfMonth()` walks the page tree. Text matching supports wildcards and quoted exact phrases, `title ~ "ADR*"` and `text ~ "\"exact phrase\""`.

Neither language has variables, functions, or a way to be tested. That's the ceiling, and it's a low one. It's also why the discipline of keeping the logic inside the query is worth something: an expression you can't unit-test should at least be an expression you can read in one line and run by hand.

## Where rules stop being queries

Two features push past that ceiling and both deserve suspicion in proportion to how useful they are.

Smart values interpolate context into actions — `{{issue.key}}`, `{{issue.assignee.displayName}}`, `{{trigger.changelog.field}}`, `{{now}}`, and `{{#issues}}...{{/issues}}` to iterate. Branching adds control flow:

```
{{#if(equals(issue.priority,"Critical"))}}
Send immediate alert
{{else}}
Add to daily digest
{{/if}}
```

That is a template language with conditionals, living in a text box, with no version control and no test harness. It is genuinely the right tool for formatting a Slack message. It is the wrong place to put a business rule, because the moment a branch means something, the rule has become a program that nobody can review as one.

The other thing worth naming: rules execute as somebody. The standing guidance is to grant automation permissions carefully, use service accounts for rule execution, and audit permissions regularly — because a rule inherits an identity, and a rule holding admin permissions is an admin that never sleeps and never asks. `Delete Issue` is an available action. So is `Execute Script`.

## What I'd actually do

Write the JQL first, in the issue navigator, and look at what comes back. If the result set is right, you have most of a rule. If it isn't, you have saved yourself deploying something that quietly acts on the wrong hundred issues.

Prefer a schedule unless latency genuinely matters. Keep one purpose per rule and name it after what it does, not after what triggered it. Put the logic in the query and leave the action dumb.

And when the temptation arrives to add a branch, a smart-value template, and a second condition group to one rule — that's the signal that the thing you're building stopped being automation and became software, and it should go somewhere software can be reviewed.
