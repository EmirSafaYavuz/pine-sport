import { Gender } from "./gender.model";

export interface TrainerRegisterModel {
  fullName: string;
  email: string;
  mobilePhone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  notes?: string;
  password: string;
  specialization: string;
}
