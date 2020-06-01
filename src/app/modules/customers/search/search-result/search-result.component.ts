import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {SearchResultItem} from "../../../../shared/models/search-result-item";
import {SearchResult} from "../../../../shared/models/search-result";
import {Item} from "../../../../shared/models/item";
import {ItemType} from "../../../../shared/models/enum/item-type";
import * as SearchActions from "../store/search.actions";
import * as fromCustomers from "../../store";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  public searchResult: SearchResult = {
    customers: [],
    customerGroups: []
  };

  constructor(
    private store: Store<fromCustomers.State>,) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe( select(fromCustomers.getFeatureRootState) )
      .subscribe(customersState => {
        this.searchResult = customersState.search.searchResult;
      })
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  public onClearSearch(): void {
    this.store.dispatch( SearchActions.clearSearchResult() );
  }


  public getSearchResultItem(item: Item, itemType: ItemType): SearchResultItem {
    return {
      name: item.name,
      id: item.id,
      type: itemType,
      status: item.status
    }
  }
}
