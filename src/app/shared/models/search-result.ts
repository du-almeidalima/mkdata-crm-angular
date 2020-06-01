import {Customer} from "./customer";
import {CustomerGroup} from "./customer-group";

export interface SearchResult {
  customers: Customer[];
  customerGroups: CustomerGroup[];
}
