import {AsyncValidatorFn} from "@angular/forms";
import {catchError, debounceTime, first, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {CustomerService} from "./customer.service";

/**
 * Async Validator para verificar se existe um usuário com o CPF/CNPJ provido
 * @param customerService
 */
export const cpfCpnjAsyncValidator = (customerService: CustomerService): AsyncValidatorFn => {
  return control => control.valueChanges.pipe(
    debounceTime(1000),
    switchMap(value => customerService.checkCpfCnpj(value)),
    map(resp => resp._embedded.customers.length > 0 ? { cpfCnpjExists: true } : null),
    catchError(err => {
      // Spring vai retornar 404 para caso o CPF não exista
      return of(err.message);
    }),
    first()
  )
};
