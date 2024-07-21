# turso-client

A client for the Turso API.

example usage:

```typescript
import { TursoClient } from "turso-client";

const client = new TursoClient({ apiKey: env.TURSO_API_KEY });

const result = await client.databases.create("test", {
  name: "testname",
  group: "groupname",
});

console.log(result.database.Name);
```

To install dependencies:

```bash
bun install
```

To test:

```bash
bun test
```

## License

MIT
