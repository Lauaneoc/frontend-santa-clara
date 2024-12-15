import { Enterprise } from "./Enterprise";

export interface Scheduling {
  id: string;
  id_enterprise: number
  enterprise: Enterprise
  cpf: string;
  name: string;
  dateBirthday: string;
  email: string
  phoneNumber: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}