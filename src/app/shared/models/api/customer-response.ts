import {Customer} from "../customer";

/** Interface que estende {@link Customer} e implementa os meta dados do HATEOAS na resposta da API */
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
