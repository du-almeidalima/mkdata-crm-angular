import {catchError, map} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {CustomerGroupService} from "./customer-group.service";
import {of} from "rxjs";

/**
 * Async Validator para verificar se existe um Customer Group com esse nome
 * @param customerGroupService O Service que fará a busca
 */
export const customerGroupNameValidator = (customerGroupService: CustomerGroupService) => {
  return (input: FormControl) => {
    return customerGroupService.getCustomerGroupByName(input.value)
      .pipe(
        map(res => {
          const customers = res._embedded.customerGroups;
          return customers.length > 0 ? { nameExists: true } : null;
        }),
        catchError(err => {
          // Spring vai retornar 404 para caso o CPF não exista
          console.log(err);
          return of(err.message)
        })
    );
  };
};
