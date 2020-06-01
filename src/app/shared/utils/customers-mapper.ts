import {CustomerPost} from '../models/api/customer-post';
import {Customer} from '../models/customer';
import {environment as env} from '../../../environments/environment';

export class CustomersMapper {
  private static readonly CUSTOMER_URL = env.baseUrl + env.customers;
  static mapCustomerToCustomerPost(customer: Customer): CustomerPost {
    return {
      ...customer,
      customerGroup: customer.customerGroup ? `${CustomersMapper.CUSTOMER_URL}/${customer.customerGroup.id}` : null
    };
  }
}
