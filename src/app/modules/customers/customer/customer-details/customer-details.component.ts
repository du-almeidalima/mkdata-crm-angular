import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Customer} from '../../../../shared/models/customer';
import {Message} from '../../../../shared/message';
import * as CustomerCommonActions from '../../store/common.actions';
import * as fromCustomers from '../../store/index';
import * as CustomerActions from '../store/customer.actions';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['../../customers.component.scss']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {

  public customer: Customer;
  public message: Message;
  private storeSub: Subscription;

  get registryDateParsed(): string {
    return new Date(this.customer.registerDate).toLocaleString('pt-BR', { timeZone: 'UTC' });
  }

  constructor(
    private store: Store<fromCustomers.State>,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe( select(fromCustomers.getFeatureRootState) )
      .subscribe( customersState => {
        this.customer = customersState.customer.current;
        this.message = customersState.common.message;
      });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onEditUser(): void {
    this.router.navigate(['/clientes', 'cliente', this.customer.id, 'edit']);
  }

  onDeleteUser(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(CustomerActions.deleteCustomer({ payload: this.customer.id }));
      }
    });
  }

  onDismissMessage() {
    this.store.dispatch(CustomerCommonActions.dismissMessage());
  }
}
