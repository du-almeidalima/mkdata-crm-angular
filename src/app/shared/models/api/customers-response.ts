import {Customer} from '../customer';
import {CustomerResponse} from './customer-response';

/** Interface que estende {@link Customer} e implementa os meta dados do HATEOAS na resposta da API */
export interface CustomersResponse {
  _embedded: {
    customers: CustomerResponse[]
  };
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
  };
}
