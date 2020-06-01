import {Action, createReducer, on} from "@ngrx/store";
import {SearchResult} from "../../../../shared/models/search-result";
import * as SearchActions from './search.actions';

export interface SearchState {
  searchResult: SearchResult;
}

const initialState: SearchState = {
  searchResult: null
};

// Customer Reducers
const customerReducerCreator = createReducer(initialState,
  on(SearchActions.setSearchResult, (state, props) => ({ ...state, searchResult: props.payload})),
  on(SearchActions.clearSearchResult, state => ({ ...state, searchResult: null })),
);

export function searchReducer(state: SearchState | undefined, action: Action) {
  return customerReducerCreator(state, action);
}
