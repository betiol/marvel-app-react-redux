/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

import type { Action } from "../actions/types";

export type ComicsState = {
  isFetching: boolean,
  error: ?Error,
  comics: Array<*>,
  chars: Array<*>,
  hasMore: boolean,
  total: number,
  items: Array,
  isSearching: boolean,
  original: Array<*>,
  comic: Array<*>,
  isFetchingComic: boolean
};

const initialState: ComicsState = {
  isFetching: false,
  error: null,
  comics: [],
  chars: [],
  hasMore: false,
  total: 0,
  items: [],
  isSearching: false,
  original: [],
  comic: [],
  isFetchingComic: false
};

export function comics(
  state: ComicsState = initialState,
  action: Action
): ComicsState {
  switch (action.type) {
    case "FETCH_COMICS_PENDING":
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case "CLEAR_FILTER":
      return {
        ...initialState
      };
    case "FETCH_COMIC_PENDING":
      return {
        ...state,
        isFetchingComic: true,
        error: null
      };
    case "FILTER_COMICS_REQUEST_PENDING":
      return {
        ...state,
        isFetching: true,
        error: null,
        isSearching: true,
        comics: []
      };
    case "FILTER_COMICS_REQUEST":
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case "FILTER_COMICS_REQUEST_FULFILLED":
      let filter = action.payload;
      return {
        ...state,
        isFetching: false,
        hasMore: false,
        isSearching: true,
        comics: filter.data.results,
        original: state.comics
      };
    case "FETCH_CHAR_BY_COMIC_PENDING":
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case "FETCH_CHAR_BY_COMIC_FULFILLED":
      let payload: any = action.payload;
      return {
        ...state,
        isFetching: false,
        chars: payload
      };
    case "FETCH_CHAR_BY_COMIC_REJECTED":
      return {
        ...state,
        isFetching: false
      };
    case "FETCH_COMICS_FULFILLED":
      let comics = action.payload;
      let { total, count, offset, results } = comics.data;
      return {
        ...state,
        isFetching: false,
        isSearching: false,
        comics: state.comics.concat(results),
        hasMore: Boolean(total > count && offset < total),
        original: state.comics
      };
    case "FETCH_COMIC_FULFILLED":
      let comic = action.payload;
      return {
        ...state,
        isFetchingComic: false,
        comic: comic.data.results
      };
    case "FETCH_COMIC_REJECTED":
      return {
        ...state,
        isFetchingComic: false,
        isSearching: false,
        error: action.payload
      };
    case "FETCH_COMICS_REJECTED":
      return {
        ...state,
        isFetching: false,
        isSearching: false,
        error: action.payload
      };
    default:
      return initialState;
  }
}
