import {Person} from "../enum/person";

/* Customer DTP seguindo Spring HATEOAS */
export interface CustomerPost {
  id?: number;
  name: string;
  type: Person;
  cpfCnpj: string;
  rgIe: string;
  status: boolean;
  registerDate: number;
  customerGroup: string;
  phones: string[];
}
