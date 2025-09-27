# Complete Guide to Jira and Confluence Automation Rules

## Table of Contents
1. [Introduction to Automation](#introduction-to-automation)
2. [Getting Started](#getting-started)
3. [Jira Automation Rules](#jira-automation-rules)
4. [Confluence Automation Rules](#confluence-automation-rules)
5. [Best Practices](#best-practices)
6. [Common Use Cases](#common-use-cases)
7. [Troubleshooting](#troubleshooting)
8. [Advanced Techniques](#advanced-techniques)

## Introduction to Automation

Automation rules in Jira and Confluence help streamline workflows, reduce manual tasks, and ensure consistent processes across your organization. These rules follow a simple structure: **Trigger → Condition(s) → Action(s)**.

### Key Benefits
- **Reduced Manual Work**: Automate repetitive tasks like status updates and notifications
- **Improved Consistency**: Ensure processes are followed uniformly
- **Enhanced Productivity**: Free up time for higher-value activities
- **Better Governance**: Automatic compliance with organizational standards
- **Faster Response Times**: Immediate reactions to specific events

### Rule Components
- **Triggers**: Events that start the automation (e.g., issue created, page updated)
- **Conditions**: Criteria that must be met for actions to execute
- **Actions**: What happens when triggers fire and conditions are met

## Getting Started

### Prerequisites
- Jira/Confluence administrator or appropriate permissions
- Understanding of your team's workflows
- Access to Automation settings in your instance

### Accessing Automation
**Jira**: Settings → System → Automation
**Confluence**: Settings → General Configuration → Automation

### Rule Limits
- **Jira Cloud**: 1000 rules per site, 100 executions per rule per month (varies by plan)
- **Confluence Cloud**: 1000 rules per site, execution limits based on plan
- **Server/Data Center**: No built-in limits but performance considerations apply

## Jira Automation Rules

### Common Triggers

#### Issue-Based Triggers
- **Issue Created**: When a new issue is added
- **Issue Updated**: When any field changes
- **Issue Transitioned**: When status changes
- **Issue Assigned**: When assignee changes
- **Issue Commented**: When someone adds a comment
- **Issue Deleted**: When an issue is removed

#### Time-Based Triggers
- **Scheduled**: Run at specific times/intervals
- **Field Value Changed**: When specific fields are modified

### Essential Conditions

#### Field Conditions
- **Issue Fields Changed**: Specific field modifications
- **Compare Fields**: Field value comparisons
- **User Condition**: Actions based on user roles/groups
- **Issue Properties**: Custom field conditions

#### Advanced Conditions
- **JQL Condition**: Use Jira Query Language for complex criteria
- **Related Issues Condition**: Check parent/child/linked issues
- **Condition Groups**: Combine multiple conditions with AND/OR logic

### Key Actions

#### Issue Management
- **Edit Issue**: Update fields, status, assignee
- **Create Issue**: Generate new tickets
- **Clone Issue**: Duplicate with modifications
- **Link Issues**: Create relationships between tickets
- **Delete Issue**: Remove tickets (use carefully)

#### Communication
- **Send Email**: Custom notifications
- **Add Comment**: Automatic status updates
- **Send Slack/Teams Message**: External notifications

#### Advanced Actions
- **Create Branch**: Git integration
- **Log Work**: Automatic time tracking
- **Execute Script**: Custom Groovy/JavaScript code

### Example Jira Rules

#### Auto-Assignment Based on Component
```
Trigger: Issue Created
Condition: Component equals "Frontend"
Action: Assign issue to user "john.doe"

JQL Example:
project = "WEB" AND component = "Frontend" AND assignee is EMPTY
```

#### Escalation for High Priority Issues
```
Trigger: Scheduled (daily at 9 AM)
Condition: JQL Query
JQL: priority = Critical AND status not in (Done, Closed) AND updated <= -2d
Action: Send email to project lead
```

#### Auto-Close Resolved Issues
```
Trigger: Scheduled (weekly)
Condition: JQL Query  
JQL: status = Resolved AND updated <= -7d AND resolution is not EMPTY
Action: Transition issue to Done
```

#### Sprint Cleanup Automation
```
Trigger: Scheduled (daily at 6 PM)
Condition: JQL Query
JQL: Sprint in openSprints() AND status = "To Do" AND assignee is EMPTY AND created <= -3d
Action: Assign to Scrum Master for triage
```

#### Code Review Reminders
```
Trigger: Scheduled (weekdays at 10 AM)
Condition: JQL Query
JQL: status = "Code Review" AND updated <= -2d AND assignee in membersOf("developers")
Action: Send Slack message with reminder
```

## Confluence Automation Rules

### Common Triggers

#### Content Triggers
- **Page Created**: New page added
- **Page Updated**: Content modified
- **Page Moved**: Location changed
- **Page Deleted**: Content removed
- **Comment Added**: New discussion

#### User Triggers
- **User Added to Space**: New space member
- **User Removed from Space**: Member departure

### Confluence Conditions

#### Content Conditions
- **Page Title Contains**: Text matching
- **Space Condition**: Specific spaces
- **Label Condition**: Page labels
- **Page Template**: Based on templates used

#### User Conditions
- **User in Group**: Group membership
- **Page Restrictions**: Permission-based conditions

### Confluence Actions

#### Content Management
- **Add Label**: Automatic tagging
- **Move Page**: Relocate content
- **Copy Page**: Duplicate content
- **Set Page Restrictions**: Manage permissions

#### Communication
- **Send Email**: Notifications
- **Add Comment**: Automatic updates
- **Send Slack Message**: External alerts

#### Integration
- **Create Jira Issue**: From Confluence content
- **Update Jira Issue**: Based on page changes

### Example Confluence Rules

#### Auto-Label New Pages
```
Trigger: Page Created
Condition: Space = "Product Documentation"
Action: Add label "needs-review"

CQL Context:
space = "Product Documentation" AND status = current AND type = page
```

#### Meeting Notes Workflow
```
Trigger: Page Created
Condition: CQL Query
CQL: title ~ "Meeting Notes*" AND space = "TEAM"
Actions: 
- Add label "meeting-notes"
- Send email to team lead
- Set page restrictions to team members only
```

#### Outdated Content Notifications
```
Trigger: Scheduled (weekly)
Condition: CQL Query
CQL: space = "DOCS" AND lastmodified <= -90d AND status = current AND label != "archived"
Action: Send email to content owners requesting review
```

#### Draft Content Cleanup
```
Trigger: Scheduled (monthly)
Condition: CQL Query  
CQL: label = "draft" AND created <= -30d AND contributor != currentUser()
Action: Send notification to page creator
```

#### Knowledge Base Article Workflow
```
Trigger: Page Updated
Condition: CQL Query
CQL: space = "KB" AND label = "published" AND lastmodified >= -1d
Action: Send notification to support team about KB updates
```

## Best Practices

### Rule Design Principles

#### Keep It Simple
- Start with basic rules and add complexity gradually
- One clear purpose per rule
- Avoid overly complex condition chains

#### Use Descriptive Names
- Clear rule names: "Auto-assign Frontend issues to John"
- Detailed descriptions explaining purpose and logic
- Document business rationale

#### Test Thoroughly
- Use test projects/spaces for rule development
- Validate with edge cases
- Monitor rule execution logs

### Performance Considerations

#### Avoid Infinite Loops
- Be careful with rules that modify the same fields they monitor
- Use conditions to prevent recursive execution
- Consider rule execution order

#### Optimize Conditions
- Put most restrictive conditions first
- Use JQL efficiently in Jira rules
- Minimize API calls in actions

#### Monitor Usage
- Track rule execution frequency
- Watch for failed executions
- Review performance impact regularly

### Security Best Practices

#### Permission Management
- Grant automation permissions carefully
- Use service accounts for rule execution
- Regular permission audits

#### Data Protection
- Avoid exposing sensitive information in logs
- Use appropriate field visibility settings
- Consider data retention policies

## Common Use Cases

### Project Management

#### Sprint Management
```
Trigger: Issue Transitioned to "In Progress"
Condition: Sprint is not null AND Assignee is empty
Action: Assign to sprint owner
```

#### Release Preparation
```
Trigger: Version Released
Condition: Fix Version = [target version]
Action: Create deployment checklist issue
```

### Team Communication

#### Daily Standup Reminders
```
Trigger: Scheduled (weekdays at 8:30 AM)
Condition: Issues assigned to team AND Status ≠ Done
Action: Send Slack message with open issues
```

#### Code Review Notifications
```
Trigger: Issue Transitioned to "Code Review"
Condition: Component = [any]
Action: Send email to tech leads
```

### Compliance and Governance

#### Documentation Requirements
```
Trigger: Page Created
Condition: Space = "Architecture" AND Template ≠ "RFC Template"
Action: Add comment requesting RFC compliance
```

#### Approval Workflows
```
Trigger: Issue Updated
Condition: Priority changed to "Critical"
Action: Add approval required label
```

## Troubleshooting

### Common Issues

#### Rules Not Triggering
- **Check Permissions**: Ensure automation user has required access
- **Verify Conditions**: Test conditions independently
- **Review Triggers**: Confirm trigger events are occurring
- **Check Rule Status**: Ensure rule is enabled

#### Poor Performance
- **Optimize Conditions**: Reorder for efficiency
- **Reduce Frequency**: Adjust scheduled rule timing
- **Simplify Actions**: Break complex rules into smaller ones
- **Monitor Execution**: Use audit logs to identify bottlenecks

#### Unexpected Behavior
- **Review Rule Logic**: Check condition combinations
- **Test in Isolation**: Disable other rules temporarily
- **Check Dependencies**: Verify external integrations
- **Examine Logs**: Use execution history for debugging

### Debugging Techniques

#### Audit Logs
- Access through Settings → Audit Log
- Filter by automation activities
- Review execution details and errors

#### Test Rules
- Use dedicated test projects/spaces
- Create sample data for testing
- Validate rule behavior before production

#### Incremental Development
- Build rules step by step
- Test each component individually
- Add complexity gradually

## Query Languages Reference

### JQL (Jira Query Language) Syntax

#### Basic Structure
A simple query in JQL (also known as a "clause") consists of a field, followed by an operator, followed by one or more values or functions.

```jql
field operator value
```

#### Core Operators
```jql
# Equality operators
project = "MYPROJECT"
assignee != currentUser()
priority in (High, Critical)
status not in (Done, Closed)

# Comparison operators
created >= -30d
priority > Normal
timeestimate <= 8h

# Text operators
summary ~ "database"          # Contains word
description !~ "deprecated"   # Does not contain
summary ~ "bug*"              # Wildcard search
summary ~ "\"exact phrase\""  # Exact phrase match

# Empty/null operators
assignee is EMPTY
assignee is not EMPTY
```

#### Essential JQL Fields
```jql
# Issue identification
project = "PROJ"
key = "PROJ-123"
parent = "PROJ-100"

# People fields
assignee = "john.doe"
reporter in membersOf("developers")
creator = currentUser()

# Status and workflow
status = "In Progress"
resolution = Unresolved
status changed to "Done" during (-1w, now())

# Dates and time
created >= startOfYear()
updated <= -7d
resolutiondate > "2024-01-01"
duedate < endOfWeek()

# Priority and type
priority in (High, Highest)
issuetype = Bug
issueFunction in subtasksOf("parent = PROJ-100")

# Custom fields
"Story Points" > 8
"Sprint" in openSprints()
```

#### Date Functions and Relative Dates
```jql
# Relative date functions
created >= -2w                    # Last 2 weeks
updated <= -3d                    # More than 3 days ago
duedate >= startOfDay()           # Today onwards
created <= endOfMonth(-1)         # Before end of last month

# Specific date ranges
created >= "2024-01-01" AND created <= "2024-01-31"
resolved during ("2024-01-01", "2024-12-31")

# Time-based functions
created >= startOfYear()
updated <= endOfWeek()
duedate < startOfMonth(1)         # Before start of next month
```

#### Complex JQL Queries
```jql
# Multiple conditions with precedence
project = "WEB" AND (priority = High OR priority = Highest) AND assignee = currentUser()

# Advanced filtering
project in (PROJ, TEST) AND status = "In Progress" AND updated >= -1d ORDER BY priority DESC

# Sprint and agile queries
Sprint in openSprints() AND assignee in membersOf("development-team")
Sprint in closedSprints() AND Sprint not in futureSprints()

# Linked issues
issue in linkedIssues("PROJ-123", "blocks")
parent = "PROJ-100" AND status != Done

# Commenting and updates
commented >= -1w
status changed from "To Do" to "In Progress" by currentUser()
assignee changed after "-2d"

# Epic and hierarchy
"Epic Link" = "PROJ-50"
issueFunction in subtasksOf("project = PROJ AND issuetype = Epic")

# Version and release
fixVersion in unreleasedVersions()
affectedVersion = "1.0.0"
fixVersion in releasedVersions() AND resolved >= -30d
```

#### JQL Functions for Automation
```jql
# User and group functions
assignee in membersOf("jira-developers")
reporter = currentUser()
watcher = currentUser()

# Date functions
created >= startOfDay()
updated <= endOfDay(-1)
due >= startOfWeek()

# Issue relationship functions
issueFunction in subtasksOf("parent = EPIC-123")
issueFunction in linkedIssuesOf("key = PROJ-456", "Blocks")
issueFunction in parentsOf("assignee = currentUser()")

# Sprint functions (for Scrum projects)
Sprint in openSprints()
Sprint in closedSprints()
Sprint = "Sprint 23"

# Version functions
fixVersion in unreleasedVersions("PROJ")
fixVersion in releasedVersions("PROJ")
affectedVersion in earliestUnreleasedVersion("PROJ")
```

#### Real-world JQL Examples for Automation
```jql
# Overdue issues assigned to current user
assignee = currentUser() AND duedate < now() AND status != Done

# High priority bugs created this week
issuetype = Bug AND priority in (High, Highest) AND created >= -1w

# Issues ready for testing
status = "Ready for QA" AND assignee in membersOf("qa-team")

# Stale in-progress issues
status = "In Progress" AND updated <= -1w AND assignee != EMPTY

# Epic completion tracking
project = "PROJ" AND "Epic Link" = "PROJ-100" AND status in (Done, Closed)

# Code review backlog
labels = "needs-review" AND status = "Code Review" AND assignee in membersOf("tech-leads")

# Release preparation
fixVersion = "2.1.0" AND status not in (Done, Closed, "Won't Do")

# Security vulnerability tracking
labels in (security, vulnerability) AND priority = Highest AND status != Done
```

### CQL (Confluence Query Language) Syntax

#### Basic Structure
A simple query in CQL (also known as a 'clause') consists of a field, followed by an operator, followed by one or more values or functions.

```cql
field operator value
```

#### Core CQL Fields and Operators
```cql
# Space and content identification
space = "PROJ"
space in ("PROJ", "DOCS", "TECH")
title = "Project Overview"
title ~ "meeting notes"

# Content type filtering
type = page
type = blogpost
type = attachment
type in (page, comment)

# Content status
status = current
status in (current, trashed)

# User and contributor fields
contributor = "john.doe"
creator = "jane.smith"
contributor in ("john.doe", "jane.smith")

# Date filtering
created >= "2024-01-01"
lastmodified <= -7d
created >= startOfDay()

# Label and categorization
label = "meeting-notes"
label in ("draft", "review", "approved")
label = "team-alpha"

# Content hierarchy
ancestor = "Project Documentation"
parent = "Technical Specs"

# Text search
text ~ "database migration"
text ~ "API*"
text ~ "\"exact phrase\""
```

#### Date Functions in CQL
```cql
# Relative dates
created >= -1w                    # Last week
lastmodified >= -30d              # Last 30 days
created <= -1d                    # More than 1 day ago

# Specific date ranges
created >= "2024-01-01" AND created <= "2024-12-31"
lastmodified during ("2024-01-01", "2024-01-31")

# Date functions
created >= startOfMonth()
lastmodified >= startOfWeek()
created <= endOfYear()
```

#### Complex CQL Queries
```cql
# Multi-space documentation search
space in ("PROJ", "TECH") AND label = "specification" AND status = current

# Recent updates by team
space = "TEAM" AND lastmodified >= -7d AND contributor in ("alice", "bob", "charlie")

# Draft content for review
label = "draft" AND space = "DOCS" AND created >= -14d ORDER BY created DESC

# Outdated documentation
space = "DOCS" AND lastmodified <= -90d AND status = current AND type = page

# Meeting notes hierarchy
ancestor = "Meeting Notes" AND created >= startOfMonth() AND type = page

# Template-based content
title ~ "Template*" AND space = "ADMIN" AND type = page

# Archived content cleanup
status = trashed AND lastmodified <= -30d

# Content without labels
label is null AND space = "PROJ" AND type = page
```

#### CQL for Content Management
```cql
# Find pages needing review
label in ("needs-review", "outdated") AND space in ("DOCS", "SPECS")

# Personal drafts
creator = currentUser() AND label = "draft"

# Popular content by space
space = "KB" AND type = page ORDER BY title

# Recent blog posts
type = blogpost AND created >= -30d ORDER BY created DESC

# Compliance documentation
space = "COMPLIANCE" AND label in ("policy", "procedure") AND status = current

# Technical documentation updates
space in ("TECH", "API") AND lastmodified >= startOfWeek() AND type = page

# Content by specific author
contributor = "technical.writer" AND space = "DOCS" AND created >= -1w
```

#### CQL Functions Reference
```cql
# Date functions
startOfDay()
startOfWeek()  
startOfMonth()
startOfYear()
endOfDay()
endOfWeek()
endOfMonth() 
endOfYear()

# User functions
currentUser()

# Content relationship functions
ancestor = "parent-page-title"
parent = "direct-parent-title"

# Search functions (for text fields)
text ~ "search term"
title ~ "page*"          # Wildcard
title ~ "\"exact match\""  # Exact phrase
```

#### Advanced CQL Examples for Automation
```cql
# Quarterly documentation review
space = "DOCS" AND lastmodified <= -90d AND status = current AND type = page

# New team member onboarding content
label = "onboarding" AND space = "HR" AND status = current ORDER BY title

# API documentation maintenance
space = "API" AND (title ~ "endpoint" OR title ~ "reference") AND lastmodified <= -60d

# Meeting notes without action items
ancestor = "Meeting Notes" AND NOT text ~ "action" AND created >= -30d

# Draft content approaching deadline
label = "draft" AND created <= -14d AND space != "PERSONAL"

# Compliance audit preparation  
label in ("gdpr", "sox", "hipaa") AND lastmodified >= startOfQuarter()

# Knowledge base article updates
space = "KB" AND label = "customer-facing" AND lastmodified >= -7d

# Architecture decision records
space = "ARCH" AND title ~ "ADR*" AND status = current ORDER BY created DESC
```

## Advanced Techniques

### Smart Values
Dynamic variables that provide context-aware information:

```
{{issue.key}} - Issue key
{{issue.summary}} - Issue title
{{issue.assignee.displayName}} - Assignee name
{{trigger.changelog.field}} - Changed field
{{now}} - Current timestamp
{{#issues}}...{{/issues}} - Iterate through issues
```

### Branch Rules
Create conditional logic within rules:

```
{{#if(equals(issue.priority,"Critical"))}}
Send immediate alert
{{else}}
Add to daily digest
{{/if}}
```

### Custom Fields and Properties
Store automation state:

```
Action: Set entity property
Key: last_processed
Value: {{now}}
```

### Integration Patterns

#### Jira-Confluence Integration
```
Trigger: Issue Status = Done
Condition: Issue Type = "Documentation Task"
Action: Create Confluence page from template
```

#### External Tool Integration
```
Trigger: Issue Created
Condition: Component = "API"
Action: Send webhook to monitoring system
```

### Bulk Operations
Process multiple items efficiently:

```
Trigger: Scheduled
JQL: project = PROJ AND status = "In Progress" AND updated < -7d
Action: Bulk transition to "Stalled"
```

### Template Rules
Create reusable rule patterns for common scenarios across projects and teams.

## Conclusion

Effective automation in Jira and Confluence requires understanding your team's workflows, starting simple, and iterating based on results. Focus on high-impact, repetitive tasks first, then expand to more complex scenarios. Regular monitoring and optimization ensure your automation continues to provide value as your organization grows and evolves.

Remember: automation should enhance human decision-making, not replace it entirely. Always maintain the ability to override automated actions when business context requires it.