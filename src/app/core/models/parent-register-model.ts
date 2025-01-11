import { Gender } from "./gender.model";

export interface ParentRegisterModel {
  fullName: string;
  email: string;
  mobilePhone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  notes?: string;
  password: string;
}
