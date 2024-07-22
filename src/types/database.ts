export interface DatabaseResponse {
  Name: string;
  DbId: string;
  Hostname: string;
  block_reads: boolean;
  block_writes: boolean;
  allow_attach: boolean;
  regions: string[];
  primaryRegion: string;
  type: string;
  version: string;
  group: string;
  is_schema: boolean;
  schema: string;
  sleeping: boolean;
}

export interface CreateDatabaseBody {
  name: string;
  group: string;
  seed?: {
    type?: "database" | "dump";
    name?: string;
    url?: string;
    timestamp?: string;
  };
  size_limit?: string;
  is_schema?: boolean;
  schema?: string;
}

export interface CreateDatabaseResponse {
  DbId: string;
  Hostname: string;
  Name: string;
}

export interface createTokenQuery {
  expiration?: string;
  authorization?: "full-access" | "read-only";
}

export interface createTokenBody {
  permissions: {
    read_attach: {
      databases: string[];
    };
  };
}

export interface retriveConfigurationResponse {
  size_limit: string;
  allow_attach: boolean;
  block_reads: boolean;
  block_writes: boolean;
}
