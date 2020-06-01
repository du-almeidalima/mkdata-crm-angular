import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';

import {ConfirmDialogComponent} from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {SearchResultItem} from '../../../../../shared/models/search-result-item';
import {ItemType} from '../../../../../shared/models/enum/item-type';
import * as CustomerGroupActions from '../../../customer-group/store/customer-group.actions';
import * as CustomerActions from '../../../customer/store/customer.actions';
import * as SearchActions from '../../store/search.actions';
import * as fromCustomers from '../../../store';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styles: [`
    .app-search-result-item-title {
      margin-top: 10px;
      width: available;
    }
  `]
})
export class SearchResultItemComponent {

  @Input()
  public item: SearchResultItem;

  get link(): string {
    switch (this.item.type) {
      case ItemType.CUSTOMER:
        return `/clientes/cliente/${this.item.id}`;
      case ItemType.CUSTOMER_GROUP:
        return `/clientes/grupo/${this.item.id}`;
    }
  }

  constructor(
    private store: Store<fromCustomers.State>,
    private dialog: MatDialog,
    private router: Router) { }

  public onDeleteUser(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (this.item.type) {
          case ItemType.CUSTOMER:
            this.store.dispatch(CustomerActions.deleteCustomer({ payload: this.item.id }));
            break;
          case ItemType.CUSTOMER_GROUP:
            this.store.dispatch(CustomerGroupActions.deleteCustomerGroup({ payload: this.item.id }));
            break;
        }
      }

      this.store.dispatch( SearchActions.refreshSearchResults());
    });
  }

  public onItemClick(): void {
    console.log(this.link);
    this.router.navigate([this.link]);
  }
}
