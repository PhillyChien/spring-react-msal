import { Role } from "../../../constants/role-enum";

export interface GetMeResponse {
  id: number;
  email: string;
  roles: Role[];
}
