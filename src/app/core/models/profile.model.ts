import { UserRole } from "../services/auth.service";
import { Gender } from "./gender.model";

export interface Profile {
  userId: number;
  fullName: string;
  email: string;
  mobilePhones: string;
  address: string;
  notes?: string;
  gender: Gender;
  status: boolean;
  refreshToken: string;
  role: UserRole;
}
