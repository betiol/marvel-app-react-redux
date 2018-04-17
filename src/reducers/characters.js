/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

import type { Action } from "../actions/types";

export type CharactersState = {
  isFetching: boolean,
  error: ?Error,
  characters: Array<*>,
  comics: Array<*>,
  total: number,
  hasMore: boolean,
  isSearching: boolean,
  original: Array<*>,
  character: Array<*>,
  isFetchingComics: boolean
};

const initialState: CharactersState = {
  isFetching: false,
  error: null,
  characters: [],
  comics: [],
  total: 0,
  hasMore: false,
  isSearching: false,
  original: [],
  character: [],
  isFetchingComics: false
};

export function characters(
  state: CharactersState = initialState,
  action: Action
): CharactersState {
  switch (action.type) {
    case "FETCH_CHARACTERS_PENDING":
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case "FILTER_CHARACTERS_PENDING":
      return {
        ...state,
        isFetching: true,
        error: null,
        isSearching: true,
        characters: []
      };
    case "FETCH_CHARACTER_PENDING":
      return {
        ...state,
        isFetchingCharacter: true,
        error: null,
        characters: []
      };
    case "FILTER_CHARACTERS_FULFILLED":
      let filter = action.payload;
      return {
        ...state,
        isFetching: false,
        hasMore: false,
        isSearching: true,
        characters: filter.data.results,
        original: state.characters
      };
    case "FETCH_COMIC_BY_CHAR_PENDING":
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case "FETCH_COMIC_BY_CHAR_FULFILLED":
      let payload: any = action.payload;
      return {
        ...state,
        isFetching: false,
        comics: payload
      };
    case "FETCH_COMIC_BY_CHAR_REJECTED":
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case "FETCH_CHARACTERS_FULFILLED":
      let characters = action.payload;
      let { total, count, offset, results } = characters.data;
      return {
        ...state,
        isFetching: false,
        total,
        isSearching: false,
        characters: state.characters.concat(results),
        hasMore: Boolean(total > count && offset < total),
        original: state.comics
      };
    case "FETCH_CHARACTER_FULFILLED":
      let character = action.payload;
      return {
        ...state,
        isFetchingCharacter: false,
        character: character.data.results
      };
    case "FETCH_CHARACTER_REJECTED":
      return {
        ...state,
        isFetchingCharacter: false,
        isSearching: false,
        error: action.payload
      };
    case "FETCH_CHARACTERS_REJECTED":
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return initialState;
  }
}
