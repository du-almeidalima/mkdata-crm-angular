import {Page} from "./page";
import {CustomerGroupResponse} from "./customer-group-response";

export interface CustomerGroupsResponse {
  _embedded: {
    customerGroups: CustomerGroupResponse[]
  };
  page: Page;
}
