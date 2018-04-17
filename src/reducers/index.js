/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

import { combineReducers } from "redux";

import { comics } from "./comics";
import type { ComicsState } from "./comics";

import { characters } from "./characters";
import type { CharactersState } from "./characters";

export type AppState = {
  comics: ComicsState,
  characters: CharactersState
};

const rootReducer = combineReducers({
  comics,
  characters
});

export default rootReducer;
