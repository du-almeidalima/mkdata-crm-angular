import {ItemType} from "./enum/item-type";

export interface SearchResultItem {
  id: number;
  type: ItemType;
  name: string;
  status: boolean;
}
