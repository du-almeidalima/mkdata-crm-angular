import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {CustomerGroup} from '../../../../shared/models/customer-group';
import {Message} from '../../../../shared/message';
import * as CustomerCommonActions from '../../store/common.actions';
import * as CustomerGroupActions from '../store/customer-group.actions';
import * as fromCustomers from '../../store';

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
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe( select(fromCustomers.getFeatureRootState) )
      .subscribe(customersState => {
        this.customerGroup = customersState.customerGroup.current;
        this.message = customersState.common.message;
      });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onEditUser(): void {
    this.router.navigate(['/clientes', 'grupo', this.customerGroup.id, 'edit']);
  }

  onDeleteUser(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(CustomerGroupActions.deleteCustomerGroup({ payload: this.customerGroup.id }));
      }
    });
  }

  onDismissMessage() {
    this.store.dispatch(CustomerCommonActions.dismissMessage());
  }
}
