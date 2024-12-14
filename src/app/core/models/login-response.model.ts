import { Role } from "./role.model";

export interface LoginResponse {
    token: string;
    role: Role;
}
