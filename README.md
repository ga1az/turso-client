# turso-client

A TypeScript client for the Turso API, providing easy access to Turso's database management features.

## Installation

To install dependencies:

```bash
bun install
```

## Usage

First, import the TursoClient and create an instance:

```typescript
import { TursoClient } from "turso-client";

const client = new TursoClient({ apiKey: env.TURSO_API_KEY });
```

## API Reference

### API Tokens

Manage API tokens for authentication.

```typescript
// Create a new token
client.apiTokens.create("my-new-token");

// Validate the current token
client.apiTokens.validate();

// List all tokens
client.apiTokens.list();

// Revoke a token
client.apiTokens.revoke("my-token-name");
```

### Databases

Manage Turso databases.

```typescript
// List databases
client.databases.list(env.TURSO_ORG, env.TURSO_GROUP);

// Create a new database
client.databases.create(env.TURSO_ORG, {
  name: "database-name",
  group: env.TURSO_GROUP,
  is_schema: false, // optional
  schema: "schema-name", // optional
  size_limit: "1GB", // optional
  seed: {
    // optional
    type: "database",
    name: "database-name",
    url: "libsql://test.turso.io",
    timestamp: "2021-01-01T00:00:00Z",
  },
});

// Retrieve database details
client.databases.retrieve(env.TURSO_ORG, "database-name");

// Retrieve database configuration
client.databases.retrieveConfiguration(env.TURSO_ORG, "database-name");

// Delete a database
client.databases.delete(env.TURSO_ORG, "database-name");

// Create a database token
client.databases.createToken(
  env.TURSO_ORG,
  "database-name",
  { expiration: "24h", authorization: "full-access" }, // optional
  { permissions: { read_attach: { databases: ["testname"] } } } // optional
);

// Invalidate a database token
client.databases.invalidateToken(env.TURSO_ORG, "database-name");

// List database instances
client.databases.listInstances(env.TURSO_ORG, "database-name");
```

### Locations

Manage and retrieve information about Turso locations.

```typescript
// List all available locations
client.locations.list();

// Get the closest region
client.locations.closest();
```

### Organizations

Manage Turso organizations and their members.

```typescript
// List organizations
client.organizations.list();

// List organization members
client.members.list(env.TURSO_ORG);

// Add a new member to an organization
client.members.add(env.TURSO_ORG, {
  username: "newuser",
  role: "member",
});

// Remove a member from an organization
client.members.remove(env.TURSO_ORG, "username");
```

## Testing

To run the test suite:

```bash
bun test
```

## License

This project is licensed under the MIT License.

## Notes

- Make sure to replace `env.TURSO_API_KEY`, `env.TURSO_ORG`, and `env.TURSO_GROUP` with your actual Turso API key, organization name, and group name respectively.
