import { Gender } from "./gender.model";

export interface StudentRegisterModel {
  fullName: string;
  email: string;
  mobilePhone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  notes?: string;
  password: string;
  branchId: number;
  parentId: number;
}
