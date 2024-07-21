import type {
  ClosestRegionResponse,
  CreateDatabaseBody,
  CreateDatabaseResponse,
  createMemberBody,
  createMemberResponse,
  createTokenBody,
  createTokenQuery,
  createTokenResponse,
  DatabaseResponse,
  listMembersReponse,
  ListResponse,
  listTokensResponse,
  LocationsResponse,
  revokeTokenResponse,
  validateTokenResponse,
} from "./types";

export type ApiClientOptions = {
  apiKey: string;
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiRequest<T = unknown> = {
  path: string;
  method: HttpMethod;
  body?: T;
  query?: Record<string, string> | null;
  region?: true;
};

export class TursoClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly regionUrl: string;

  constructor(opts: ApiClientOptions) {
    this.baseUrl = "https://api.turso.tech/";
    this.regionUrl = "https://region.turso.io/";
    this.apiKey = opts.apiKey;
  }

  private async request<TResponse, TBody = unknown>(
    req: ApiRequest<TBody>
  ): Promise<TResponse> {
    const url = new URL(
      `${req.region ? this.regionUrl : this.baseUrl}${req.path}`
    );
    if (req.query) {
      Object.entries(req.query).forEach(([key, value]) =>
        url.searchParams.append(key, value)
      );
    }
    const init: RequestInit = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    };
    if (req.body) {
      init.body = JSON.stringify(req.body);
    }

    const response = await fetch(url.toString(), init);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json() as Promise<TResponse>;
  }

  public readonly apiTokens = {
    create: async (tokenName: string): Promise<createTokenResponse> => {
      return this.request<createTokenResponse>({
        path: `v1/auth/api-tokens/${tokenName}`,
        method: "POST",
      });
    },
    validate: async (): Promise<validateTokenResponse> => {
      return this.request<validateTokenResponse>({
        path: "v1/auth/validate",
        method: "GET",
      });
    },
    list: async (): Promise<{ tokens: listTokensResponse[] }> => {
      return this.request<{ tokens: listTokensResponse[] }>({
        path: "v1/auth/api-tokens",
        method: "GET",
      });
    },
    revoke: async (tokenName: string): Promise<revokeTokenResponse> => {
      return this.request<revokeTokenResponse>({
        path: `v1/auth/api-tokens/${tokenName}`,
        method: "DELETE",
      });
    },
  };

  public readonly databases = {
    list: async (
      organizationName: string,
      group?: string
    ): Promise<DatabaseResponse> => {
      return this.request<DatabaseResponse>({
        path: `v1/organizations/${organizationName}/databases`,
        method: "GET",
        query: group ? { group } : null,
      });
    },
    create: async (
      organizationName: string,
      body: CreateDatabaseBody
    ): Promise<{ database: CreateDatabaseResponse }> => {
      return this.request<{ database: CreateDatabaseResponse }>({
        path: `v1/organizations/${organizationName}/databases`,
        method: "POST",
        body: body,
      });
    },
    retrieve: async (
      organizationName: string,
      databaseName: string
    ): Promise<{ database: DatabaseResponse }> => {
      return this.request<{ database: DatabaseResponse }>({
        path: `v1/organizations/${organizationName}/databases/${databaseName}`,
        method: "GET",
      });
    },
    delete: async (
      organizationName: string,
      databaseName: string
    ): Promise<{ database: string }> => {
      return this.request<{ database: string }>({
        path: `v1/organizations/${organizationName}/databases/${databaseName}`,
        method: "DELETE",
      });
    },
    createToken: async (
      organizationName: string,
      databaseName: string,
      queryParams?: createTokenQuery,
      body?: createTokenBody
    ): Promise<{ jwt: string }> => {
      const record: Record<string, string> = {};
      if (queryParams) {
        if (queryParams.expiration) {
          record.expiration = queryParams.expiration;
        }
        if (queryParams.authorization) {
          record.authorization = queryParams.authorization;
        }
      }
      return this.request<{ jwt: string }>({
        path: `v1/organizations/${organizationName}/databases/${databaseName}/auth/tokens`,
        method: "POST",
        query: Object.keys(record).length > 0 ? record : null,
        body: body,
      });
    },
    invalidateToken: async (
      organizationName: string,
      databaseName: string
    ): Promise<void> => {
      return this.request<void>({
        path: `v1/organizations/${organizationName}/databases/${databaseName}/auth/rotate`,
        method: "POST",
      });
    },
    listInstances: async (
      organizationName: string,
      databaseName: string
    ): Promise<{ instances: string[] }> => {
      return this.request<{ instances: string[] }>({
        path: `v1/organizations/${organizationName}/databases/${databaseName}/instances`,
        method: "GET",
      });
    },
  };

  public readonly locations = {
    list: async (): Promise<LocationsResponse> => {
      return this.request<LocationsResponse>({
        path: "v1/locations",
        method: "GET",
      });
    },
    closest: async (): Promise<ClosestRegionResponse> => {
      return this.request<ClosestRegionResponse>({
        path: "",
        method: "GET",
        region: true,
      });
    },
  };

  public readonly organizations = {
    list: async (): Promise<ListResponse[]> => {
      return this.request<ListResponse[]>({
        path: "v1/organizations",
        method: "GET",
      });
    },
  };

  public readonly members = {
    list: async (
      organizationName: string
    ): Promise<{ members: listMembersReponse[] }> => {
      return this.request<{ members: listMembersReponse[] }>({
        path: `v1/organizations/${organizationName}/members`,
        method: "GET",
      });
    },
    add: async (
      organizationName: string,
      body: createMemberBody
    ): Promise<createMemberResponse> => {
      return this.request<createMemberResponse>({
        path: `v1/organizations/${organizationName}/members`,
        method: "POST",
        body: body,
      });
    },
    remove: async (
      organizationName: string,
      username: string
    ): Promise<{ member: string }> => {
      return this.request<{ member: string }>({
        path: `v1/organizations/${organizationName}/members/${username}`,
        method: "DELETE",
      });
    },
  };
}
