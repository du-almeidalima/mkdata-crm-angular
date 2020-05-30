import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment as env} from "../../../../environments/environment";
import {CustomerGroupsResponse} from "../../../shared/models/api/customer-groups-response";

@Injectable({
  providedIn: 'root'
})
export class CustomerGroupService {

  private readonly CUSTOMER_GROUP_URL = env.baseUrl + env.customerGroups;

  constructor(private http: HttpClient) { }

  public getCustomerGroupByName(name: string) {
    return this.http.get<CustomerGroupsResponse>(
      `${this.CUSTOMER_GROUP_URL}/search/searchByName`,
      {
        params: new HttpParams().set('name', name)
      }
    )
  }
}
