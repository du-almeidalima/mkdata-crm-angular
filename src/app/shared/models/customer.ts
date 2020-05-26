import {Person} from "./enum/person";
import {CustomerGroup} from "./customer-group";

export interface Customer {
  id?: number;
  name: string;
  type: Person;
  cpfCnpj: string;
  rgIe: string;
  status: boolean;
  registerDate: number;
  group: CustomerGroup;
  phones: string[];
}
