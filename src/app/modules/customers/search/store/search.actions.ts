import {createAction, props} from "@ngrx/store";
import {SearchResult} from "../../../../shared/models/search-result";

export enum SearchActionsTypes {
  StartSearch = '[Search] Start Search',
  SearchFail = '[Search] Search Fail',
  SetSearchResult = '[Search] Set Search Result',
  ClearSearchResult = '[Search] Clear Search Result'
}

// Customer Actions
export const startSearch = createAction(
  SearchActionsTypes.StartSearch,
  props<{ payload: string }>()
);

export const searchFail = createAction(
  SearchActionsTypes.SearchFail,
  props<{ }>()
);

export const setSearchResult = createAction(
  SearchActionsTypes.SetSearchResult,
  props<{ payload: SearchResult }>()
);

export const clearSearchResult = createAction(
  SearchActionsTypes.ClearSearchResult,
  props<{ payload: number }>()
);
