import {Page} from "./page";

export interface CustomerGroupsResponse {
  _embedded: {
    customerGroups: {
      id: number;
      name: string;
      status: boolean;
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
    }[];
  };
  page: Page;
}
