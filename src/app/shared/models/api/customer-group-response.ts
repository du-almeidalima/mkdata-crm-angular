import {CustomerGroup} from "../customer-group";

export interface CustomerGroupResponse extends CustomerGroup {
  _links: {
    self: {
      href: string;
    },
    customerGroup: {
      href: string;
    },
    customers: {
      href: string;
    },
  }
}
