import {Customer} from "../customer";

/**
 * Esta classe vai contar os meta dados do HATEOAS
 */
export interface CustomerResponse extends Customer {
  _links: {
    self: {
      href: string;
    },
    customer: {
      href: string;
    },
    customerGroup: {
      href: string;
    }
  }
}
