export interface listMembersReponse {
  username: string;
  role: string;
  email: string;
}

export interface createMemberBody {
  username: string;
  role: "admin" | "member";
}

export interface createMemberResponse {
  member: string;
  role: string;
}
