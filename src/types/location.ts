export interface LocationsResponse {
  locations: {
    [key: string]: string;
  };
}

export interface ClosestRegionResponse {
  server: string;
  client: string;
}
