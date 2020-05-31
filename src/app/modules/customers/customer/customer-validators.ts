import {AsyncValidatorFn} from "@angular/forms";
import {of} from "rxjs";
import {catchError, debounceTime, first, map, switchMap} from "rxjs/operators";
import {CustomerService} from "./customer.service";

/**
 * Async Validator para verificar se existe um usuário com o CPF/CNPJ provido
 * @param customerService Serviço que fará a busca
 * @param currentCpfCnpj CpfCnpj que está sendo editado
 */
export const cpfCpnjAsyncValidator = (customerService: CustomerService, currentCpfCnpj: string): AsyncValidatorFn => {
  return control => {

    if (control.value === currentCpfCnpj) {
      return of(null);
    }

    return control.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap(value => customerService.checkCpfCnpj(value)),
        map(resp => resp._embedded.customers.length > 0 ? {cpfCnpjExists: true} : null),
        catchError(err => {
          // Spring vai retornar 404 para caso o CPF não exista
          return of(err.message);
        }),
        first()
      )
  }
};
