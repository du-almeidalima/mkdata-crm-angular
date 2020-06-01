import {createAction, props} from '@ngrx/store';
import {SearchResult} from '../../../../shared/models/search-result';

export enum SearchActionsTypes {
  StartSearch = '[Search] Start Search',
  SetSearchResult = '[Search] Set Search Result',
  RefreshSearchResults = '[Search] Refresh Results',
  ClearSearchResult = '[Search] Clear Search Result'
}

// Customer Actions
export const startSearch = createAction(
  SearchActionsTypes.StartSearch,
  props<{ payload: {term: string, status: boolean} }>()
);

export const setSearchResult = createAction(
  SearchActionsTypes.SetSearchResult,
  props<{ payload: SearchResult }>()
);

export const refreshSearchResults = createAction(
  SearchActionsTypes.RefreshSearchResults
);

export const clearSearchResult = createAction(
  SearchActionsTypes.ClearSearchResult
);
