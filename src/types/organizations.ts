export interface ListResponse {
  name: string;
  slug: string;
  type: string;
  plan_id?: string;
  overages: boolean;
  blocked_reads: boolean;
  blocked_writes: boolean;
  plan_timeline?: string;
  memory?: number;
  payment_failing_since?: PaymentFailingSince;
}

export interface PaymentFailingSince {
  Time: string;
  Valid: boolean;
}
