import {Person} from './enum/person';
import {CustomerGroup} from './customer-group';
import {ItemType} from './enum/item-type';

export interface Customer {
  id?: number;
  itemType: ItemType.CUSTOMER;
  name: string;
  type: Person;
  cpfCnpj: string;
  rgIe: string;
  status: boolean;
  registerDate: number;
  customerGroup: CustomerGroup;
  phones: string[];
}
