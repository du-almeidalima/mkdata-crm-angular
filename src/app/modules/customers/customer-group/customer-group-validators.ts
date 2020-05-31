import {AsyncValidatorFn} from "@angular/forms";
import {of} from "rxjs";
import {catchError, debounceTime, first, map, switchMap} from "rxjs/operators";
import {CustomerGroupService} from "./customer-group.service";

/**
 * Async Validator para verificar se existe um Customer Group com esse nome
 * @param customerGroupService Service que fará a busca
 */
export const customerGroupNameValidator = (customerGroupService: CustomerGroupService): AsyncValidatorFn => {
  return control => control.valueChanges
    .pipe(
      debounceTime(1000),
      switchMap(value => customerGroupService.getCustomerGroupByName(value)),
      map(resp => resp._embedded.customerGroups.length > 0 ? { nameExists: true } : null),
      catchError(err => {
        // Spring vai retornar 404 para caso o CPF não exista
        return of(err.message);
      }),
      first()
    )
};
