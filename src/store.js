import { createStore } from "redux";
import allReducers from "./redux/rootReducer";
import { saveSessionState, loadSessionState } from "./utils/methods";

export default function configureStore() {
  const persistedState = loadSessionState();
  const store = createStore(
    allReducers,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    saveSessionState(store.getState());
  });

  return store;
}
