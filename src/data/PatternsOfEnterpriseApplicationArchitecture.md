# Patterns of Enterprise Application Architecture

## Table of Contents
1. [Introduction & Core Concepts](#introduction--core-concepts)
2. [Domain Logic Patterns](#domain-logic-patterns)
3. [Data Source Architectural Patterns](#data-source-architectural-patterns)
4. [Object-Relational Behavioral Patterns](#object-relational-behavioral-patterns)
5. [Object-Relational Structural Patterns](#object-relational-structural-patterns)
6. [Object-Relational Metadata Mapping Patterns](#object-relational-metadata-mapping-patterns)
7. [Web Presentation Patterns](#web-presentation-patterns)
8. [Distribution Patterns](#distribution-patterns)
9. [Offline Concurrency Patterns](#offline-concurrency-patterns)
10. [Session State Patterns](#session-state-patterns)
11. [Base Patterns](#base-patterns)

## Introduction & Core Concepts

### What is Enterprise Application Architecture?
Enterprise applications are complex software systems that support business operations. They typically involve:
- Persistent data storage
- Large amounts of data
- Concurrent data access
- Complex business logic
- Integration with other systems
- Various user interfaces

### Key Architectural Decisions
1. **Layering**: Organizing code into layers (presentation, domain, data source)
2. **Distribution**: Deciding what runs where in a distributed system
3. **Concurrency**: Managing simultaneous access to shared resources
4. **Session State**: Handling user session data
5. **Performance**: Optimizing for speed and scalability

## Domain Logic Patterns

### Transaction Script
**Definition**: Organizes business logic by procedures where each procedure handles a single request from the presentation.

**When to Use**:
- Simple business logic
- Procedural programming teams
- Quick development needed

**Example Structure**:
```
class OrderService {
    processOrder(orderId) {
        // All logic for processing an order in one method
        validateOrder()
        calculateTotals()
        updateInventory()
        sendConfirmation()
    }
}
```

### Domain Model
**Definition**: An object model of the domain that incorporates both behavior and data.

**When to Use**:
- Complex business logic
- Logic that changes frequently
- Need for reusability

**Key Concepts**:
- Rich domain objects with behavior
- Objects represent business concepts
- Business rules embedded in domain objects

### Table Module
**Definition**: A single instance that handles the business logic for all rows in a database table or view.

**When to Use**:
- Working with Record Set-based tools
- .NET DataSet environments
- Moderate complexity logic

### Service Layer
**Definition**: Defines an application's boundary with a layer of services that establishes a set of available operations.

**When to Use**:
- Multiple presentation layers
- Need for transaction control
- Remote access requirements

**Key Principles**:
- Thin layer orchestrating domain objects
- Transaction boundaries
- Application-specific logic

## Data Source Architectural Patterns

### Table Data Gateway
**Definition**: An object that acts as a Gateway to a database table. One instance handles all the rows in the table.

**Characteristics**:
- One class per database table
- Contains SQL for CRUD operations
- Returns Record Sets or simple data structures

### Row Data Gateway
**Definition**: An object that acts as a Gateway to a single record in a data source. There is one instance per row.

**Characteristics**:
- One instance per row
- Contains data and database access logic
- No domain logic

### Active Record
**Definition**: An object that wraps a row in a database table, encapsulates database access, and adds domain logic on that data.

**When to Use**:
- Simple domain logic
- Close match between database and object model
- Rapid development frameworks (Rails, Django)

### Data Mapper
**Definition**: A layer of Mappers that moves data between objects and a database while keeping them independent of each other.

**When to Use**:
- Complex domain logic
- Database schema and object model differ significantly
- Need for database independence

**Key Components**:
- Mapper classes separate from domain objects
- Handles all database interaction
- Supports complex mappings

## Object-Relational Behavioral Patterns

### Unit of Work
**Definition**: Maintains a list of objects affected by a business transaction and coordinates writing out changes.

**Benefits**:
- Manages transaction boundaries
- Optimizes database calls
- Handles consistency

**Operations**:
- Register new objects
- Register dirty objects
- Register removed objects
- Commit changes

### Identity Map
**Definition**: Ensures that each object gets loaded only once by keeping every loaded object in a map.

**Benefits**:
- Prevents duplicate objects
- Improves performance
- Maintains referential integrity

### Lazy Load
**Definition**: An object that doesn't contain all of the data you need but knows how to get it.

**Implementations**:
1. **Lazy Initialization**: Check on each access
2. **Virtual Proxy**: Placeholder object
3. **Value Holder**: Wraps the real object
4. **Ghost**: Partial object that loads itself

## Object-Relational Structural Patterns

### Identity Field
**Definition**: Saves a database ID field in an object to maintain identity between in-memory object and database row.

**Strategies**:
- Natural keys vs. Surrogate keys
- Simple vs. Compound keys
- Key generation strategies

### Foreign Key Mapping
**Definition**: Maps an association between objects to a foreign key reference between tables.

**Considerations**:
- One-to-many relationships
- Many-to-one relationships
- Referential integrity

### Association Table Mapping
**Definition**: Saves an association as a table with foreign keys to the tables that are linked by the association.

**Used For**:
- Many-to-many relationships
- Additional association attributes

### Embedded Value
**Definition**: Maps an object into several fields of another object's table.

**When to Use**:
- Value objects
- Composition relationships
- Denormalization for performance

### Serialized LOB
**Definition**: Saves a graph of objects by serializing them into a single large object (LOB).

**Trade-offs**:
- Simple storage
- No SQL querying of object internals
- Version compatibility issues

### Single Table Inheritance
**Definition**: Represents an inheritance hierarchy of classes as a single table that has columns for all the fields of the various classes.

**Advantages**:
- Simple queries
- No joins needed
- Good performance

**Disadvantages**:
- Wasted space
- Large tables
- Nullable columns

### Class Table Inheritance
**Definition**: Represents an inheritance hierarchy of classes with one table for each class.

**Advantages**:
- Normalized structure
- No wasted space
- Clear mapping

**Disadvantages**:
- Requires joins
- Complex queries
- Performance overhead

### Concrete Table Inheritance
**Definition**: Represents an inheritance hierarchy of classes with one table per concrete class in the hierarchy.

**Trade-offs**:
- No joins for single class queries
- Duplication of superclass fields
- Complex polymorphic queries

## Object-Relational Metadata Mapping Patterns

### Metadata Mapping
**Definition**: Holds details of object-relational mapping in metadata.

**Approaches**:
- Code generation
- Reflective programming
- Configuration files

### Query Object
**Definition**: An object that represents a database query.

**Benefits**:
- Encapsulates SQL
- Type-safe queries
- Composable query building

### Repository
**Definition**: Mediates between the domain and data mapping layers using a collection-like interface.

**Characteristics**:
- Encapsulates query logic
- Provides domain-specific queries
- Hides data source details

## Web Presentation Patterns

### Model View Controller (MVC)
**Definition**: Splits user interface interaction into three distinct roles.

**Components**:
- **Model**: Domain logic and data
- **View**: Presentation of data
- **Controller**: Handles user input

### Page Controller
**Definition**: An object that handles a request for a specific page or action on a Web site.

**Characteristics**:
- One controller per page
- Simple to understand
- Can lead to duplication

### Front Controller
**Definition**: A controller that handles all requests for a Web site.

**Benefits**:
- Centralized control
- Common behavior handling
- Single entry point

### Template View
**Definition**: Renders information into HTML by embedding markers in an HTML page.

**Examples**:
- JSP, ASP.NET
- Template engines (Thymeleaf, Handlebars)

### Transform View
**Definition**: A view that processes domain data element by element and transforms it into HTML.

**Approach**:
- XSLT transformations
- Programmatic transformation

### Two Step View
**Definition**: Turns domain data into HTML in two steps: first by forming some kind of logical presentation, then rendering into HTML.

**Benefits**:
- Separation of concerns
- Multiple output formats
- Consistent look and feel

### Application Controller
**Definition**: A centralized point for handling screen navigation and the flow of an application.

**Responsibilities**:
- Flow control
- Screen navigation
- State management

## Distribution Patterns

### Remote Facade
**Definition**: Provides a coarse-grained interface to fine-grained objects to improve efficiency over a network.

**Principles**:
- Reduce network calls
- Batch operations
- Transfer objects

### Data Transfer Object (DTO)
**Definition**: An object that carries data between processes in order to reduce the number of method calls.

**Characteristics**:
- No business logic
- Serializable
- Flat structure

## Offline Concurrency Patterns

### Optimistic Offline Lock
**Definition**: Prevents conflicts between concurrent business transactions by detecting a conflict and rolling back the transaction.

**Implementation**:
- Version numbers
- Timestamps
- Hash values

**Process**:
1. Read data with version
2. Make changes
3. Check version on update
4. Rollback if version changed

### Pessimistic Offline Lock
**Definition**: Prevents conflicts between concurrent business transactions by allowing only one business transaction at a time to access data.

**Characteristics**:
- Exclusive locks
- Lock manager
- Timeout handling

### Coarse-Grained Lock
**Definition**: Locks a set of related objects with a single lock.

**Benefits**:
- Simplifies locking
- Reduces deadlock risk
- Better performance

### Implicit Lock
**Definition**: Allows framework or layer supertype code to acquire offline locks.

**Approach**:
- Automatic lock acquisition
- Transparent to business logic
- Framework-managed

## Session State Patterns

### Client Session State
**Definition**: Stores session state on the client.

**Methods**:
- Cookies
- Hidden form fields
- URL parameters
- Local storage

**Trade-offs**:
- No server resources
- Limited size
- Security concerns

### Server Session State
**Definition**: Keeps session state on a server system in a serialized form.

**Approaches**:
- In-memory storage
- Database storage
- Distributed cache

### Database Session State
**Definition**: Stores session data as committed data in the database.

**Advantages**:
- Persistence
- Clustering support
- Queryable

**Disadvantages**:
- Performance overhead
- Database load

## Base Patterns

### Gateway
**Definition**: An object that encapsulates access to an external system or resource.

**Purpose**:
- Simplify external API
- Hide complexity
- Provide abstraction

### Mapper
**Definition**: An object that sets up communication between two independent objects.

**Responsibilities**:
- Bidirectional transfer
- Format conversion
- Isolation of systems

### Layer Supertype
**Definition**: A type that acts as the supertype for all types in its layer.

**Benefits**:
- Common functionality
- Consistent behavior
- Framework hooks

### Separated Interface
**Definition**: Defines an interface in a separate package from its implementation.

**Uses**:
- Reduce coupling
- Support multiple implementations
- Plugin architectures

### Registry
**Definition**: A well-known object that other objects can use to find common objects and services.

**Implementation**:
- Singleton pattern
- Static methods
- Dependency injection

### Value Object
**Definition**: A small object, like Money or Date Range, whose equality isn't based on identity.

**Characteristics**:
- Immutable
- Equality by value
- No identity

### Money
**Definition**: Represents a monetary value.

**Components**:
- Amount
- Currency
- Arithmetic operations
- Rounding rules

### Special Case
**Definition**: A subclass that provides special behavior for particular cases.

**Example**:
- Null Object pattern
- Default implementations
- Edge case handling

### Plugin
**Definition**: Links classes during configuration rather than compilation.

**Benefits**:
- Flexibility
- Extensibility
- Configuration-based behavior

### Service Stub
**Definition**: Removes dependence upon problematic services during testing.

**Uses**:
- Testing isolation
- Development without dependencies
- Predictable test behavior

### Record Set
**Definition**: An in-memory representation of tabular data.

**Characteristics**:
- Generic data structure
- Database result representation
- Framework integration

## Study Tips

1. **Understand Context**: Each pattern solves specific problems. Understand when to use each pattern.

2. **Learn Trade-offs**: Every pattern has advantages and disadvantages. Know them.

3. **Practice Implementation**: Try implementing key patterns in your preferred language.

4. **Study Combinations**: Patterns often work together. Learn common combinations.

5. **Real-World Examples**: Look for these patterns in frameworks and applications you use.

6. **Start Simple**: Begin with simpler patterns like Transaction Script before tackling complex ones like Domain Model.

7. **Focus on Problems**: Understand the problems each pattern solves rather than memorizing implementations.

8. **Draw Diagrams**: Visual representations help understand relationships between patterns.

## Common Pattern Combinations

- **Domain Model + Data Mapper + Unit of Work**: Complex domain logic with persistence
- **Table Module + Table Data Gateway**: Moderate complexity with record sets
- **Transaction Script + Row Data Gateway**: Simple logic with straightforward persistence
- **MVC + Front Controller + Template View**: Web application presentation layer
- **Service Layer + Remote Facade + DTO**: Distributed application boundaries

## Key Takeaways

1. **No Silver Bullet**: No single pattern solves all problems
2. **Context Matters**: Choose patterns based on your specific needs
3. **Evolution**: Systems often start simple and evolve to use more complex patterns
4. **Balance**: Trade-off between complexity and flexibility
5. **Consistency**: Use patterns consistently within a system
