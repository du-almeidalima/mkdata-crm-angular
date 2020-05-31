import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {Message} from "../../../shared/message";
import * as fromCustomers from "../store/index";
import * as CustomerCommonActions from "../store/common.actions";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private storeSub: Subscription;
  public message: Message;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe( select(fromCustomers.getCustomerFeatureState) )
      .subscribe( customerState => {
        this.message = customerState.common.message
      });
  }

  onDismissMessage() {
    this.store.dispatch(CustomerCommonActions.dismissMessage());
  }
}
