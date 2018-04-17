/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";

import reducers from "../reducers";

const createAppStore = compose(
  applyMiddleware(promiseMiddleware(), thunkMiddleware)
)(createStore);

export default function configureStore(callback: any) {
  const store = createAppStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
