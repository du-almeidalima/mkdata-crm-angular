import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {of} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import * as fromCustomer from '../../store';
import * as CustomerActions from './customer.actions';

@Injectable()
export class CustomerEffect {

  constructor(
    private actions$: Actions,
    private store: Store<fromCustomer.CustomersState>
  ) {}

  @Effect({dispatch: false})
  fetchCustomer = this.actions$.pipe(
    ofType(CustomerActions.CustomerActionTypes.FetchCustomer),
    tap(test => {
      console.log(test)
    })
  );

  @Effect()
  createCustomer = this.actions$.pipe(
    ofType(CustomerActions.CustomerActionTypes.CreateCustomer),
    switchMap(props => {
      //TODO: HTTP Post

      console.log('Effects => ' + props)
      return of(CustomerActions.setCustomer(props))
    })
  )
}
