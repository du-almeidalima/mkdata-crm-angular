import {ItemType} from './enum/item-type';

export interface CustomerGroup {
  id?: number;
  itemType: ItemType.CUSTOMER_GROUP;
  name: string;
  status: boolean;
}
