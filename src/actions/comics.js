/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

import Api from "../util/api";

import type { Action } from "./types";

export function fetchComics(): Action {
  return {
    type: "FETCH_COMICS",
    payload: Api.comics()
  };
}

export function clearComicFilter(): Action {
  return {
    type: "CLEAR_FILTER"
  };
}

export function fetchComicById(id: number): Action {
  return {
    type: "FETCH_CHAR_BY_COMIC",
    payload: Api.fetchCharactersFromComicId(id)
  };
}

export function fetchMoreComics(offset: number = 0): Action {
  return {
    type: "FETCH_COMICS",
    payload: Api.loadMoreComics(offset)
  };
}

export function filterResults(titleStartsWith: string): Action {
  return {
    type: "FILTER_COMICS_REQUEST",
    payload: Api.filterComics(titleStartsWith)
  };
}

export function fetchComic(id: number): Action {
  return {
    type: "FETCH_COMIC",
    payload: Api.fetchComic(id)
  };
}
