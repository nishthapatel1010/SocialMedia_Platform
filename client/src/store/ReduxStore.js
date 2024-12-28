import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
  } from "redux";
  import thunk from "redux-thunk";
  import { reducers } from "../reducers";
  
  function saveToLocalStorage(store) {
    try {
      const serializedStore = JSON.stringify(store);
      window.localStorage.setItem('store', serializedStore);
    } catch (e) {
      console.error('Could not save state to localStorage:', e);
    }
  }
  
  function loadFromLocalStorage() {
    try {
      const serializedStore = window.localStorage.getItem('store');
      if (serializedStore === null) return undefined;
      return JSON.parse(serializedStore);
    } catch (e) {
      console.error('Could not load state from localStorage:', e);
      return undefined;
    }
  }
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistedState = loadFromLocalStorage();
  
  const store = createStore(
    reducers,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
  );
  
  // Subscribe to the store to persist it on every update
  store.subscribe(() => saveToLocalStorage(store.getState()));
  
  export default store;
  