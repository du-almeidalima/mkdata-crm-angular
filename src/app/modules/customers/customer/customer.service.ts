import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment as env} from "../../../../environments/environment";
import {CustomersResponse} from "../../../shared/models/api/customers-response";

/**
 * @description Classe responsável por operações relacionadas ao Customer porém não necessárias de serem mantidas no
 * estado.
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly CUSTOMER_URL = env.baseUrl + env.customers;

  constructor(private http: HttpClient) { }

  public checkCpfCnpj(cpfCnpj: string) {
    return this.http.get<CustomersResponse>(
      `${this.CUSTOMER_URL}/search/searchByCpfCnpj`,
      {
        params: new HttpParams().set('cpfCnpj', cpfCnpj)
      }
    )
  }
}
