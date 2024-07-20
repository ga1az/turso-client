export interface createTokenResponse {
  name: string;
  id: string;
  token: string;
}

export interface validateTokenResponse {
  exp: number;
}

export interface listTokensResponse {
  name: string;
  id: string;
}

export interface revokeTokenResponse {
  token: string;
}
