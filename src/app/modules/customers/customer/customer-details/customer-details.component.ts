import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Customer} from "../../../../shared/models/customer";
import * as CustomerActions from "../store/customer.actions";
import * as fromCustomers from '../../store/index';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  public customer: Customer;
  private storeSub: Subscription;

  constructor(
    private store: Store<fromCustomers.CustomersState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe( select(fromCustomers.getCurrentCustomer) )
      .subscribe( customer => {
        this.customer = customer;
      })
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onEditUser(): void {
    this.router.navigate(['/clientes','cliente',this.customer.id,'edit'])
  }

  onDeleteUser(): void {
    if (window.confirm('Essa ação não terá volta')) {
      this.store.dispatch(CustomerActions.deleteCustomer({ id: this.customer.id }))
    }
  }
}
