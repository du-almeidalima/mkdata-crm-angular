import {catchError, map} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {CustomerService} from "./customer.service";
import {of} from "rxjs";

/**
 * Async Validator para verificar se existe um usuário com o CPF/CNPJ provido
 * @param customerService
 */
export const cpfCpnjAsyncValidator = (customerService: CustomerService) => {
  return (input: FormControl) => {
    return customerService.checkCpfCnpj(input.value)
      .pipe(
        map(res => {
          const customers = res._embedded.customers;
          return customers.length > 0 ? { cpfCnpjExists: true } : null;
        }),
        catchError(err => {
          // Spring vai retornar 404 para caso o CPF não exista
          console.log(err);
          return of(err.message)
        })
    );
  };
};
