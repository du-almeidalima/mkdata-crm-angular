import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import * as fromCustomer from '../../store';
import * as CustomerActions from './customer.actions';
import {tap} from "rxjs/operators";

@Injectable()
export class CustomerEffect {

  constructor(
    private actions$: Actions,
    private store: Store<fromCustomer.CustomersState>
  ) {}

  @Effect({dispatch: false})
  fetchCustomer = this.actions$.pipe(
    ofType(CustomerActions.AuthActionsTypes.FetchCustomer),
    tap(test => {
      console.log(test)
    })
  );
}
