import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as SearchActions from "../store/search.actions";
import * as fromCustomers from "../../store";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent implements OnInit {

  constructor(private store: Store<fromCustomers.State>) { }

  ngOnInit(): void {}

  public onSubmit(form: NgForm): void {
    const { term, status } = form.value;
    this.store.dispatch(SearchActions.startSearch({ payload: { term, status } }))
  }
}
