import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {CustomerGroup} from "../../../../shared/models/customer-group";
import {Message} from "../../../../shared/message";
import * as fromCustomers from "../../store";
import * as CustomerGroupActions from "../store/customer-group.actions";

@Component({
  selector: 'app-customer-group-details',
  templateUrl: './customer-group-details.component.html',
  styleUrls: ['../../customers.component.scss']
})
export class CustomerGroupDetailsComponent implements OnInit, OnDestroy {

  private storeSub: Subscription;
  public customerGroup: CustomerGroup;
  public message: Message;

  constructor(private store: Store<fromCustomers.State>,
              private router: Router) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe( select(fromCustomers.getCustomerGroupState) )
      .subscribe(customerGroupState => {
        this.customerGroup = customerGroupState.current;
        this.message = customerGroupState.message;
      })
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onEditUser(): void {
    this.router.navigate(['/clientes','grupo',this.customerGroup.id,'edit'])
  }

  onDeleteUser(): void {
    if (window.confirm('Essa ação não terá volta')) {
      this.store.dispatch(CustomerGroupActions.deleteCustomerGroup({ payload: this.customerGroup.id }))
    }
  }

  onDismissMessage() {
    this.store.dispatch(CustomerGroupActions.dismissMessage());
  }
}
