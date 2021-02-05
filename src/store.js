import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import allReducers from "./redux/rootReducer";
import { saveSessionState, loadSessionState } from "./utils/methods";
import uploadSaga from "./saga/saga";

export default function configureStore() {
  const persistedState = loadSessionState();
  const uploadSagaMiddleware = createSagaMiddleware();

  const middlewareEnhancer = applyMiddleware(uploadSagaMiddleware);
  const composedEnhancers = compose(middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

  const store = createStore(
    allReducers,
    persistedState,
    composedEnhancers,
  );

  uploadSagaMiddleware.run(uploadSaga);

  store.subscribe(() => {
    saveSessionState(store.getState());
  });

  return store;
}
