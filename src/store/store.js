import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "../reducers/authReducer";
import thunk from "redux-thunk";
import { uiReducer } from "../reducers/uiReducer";
import { notesReducer } from "../reducers/notesReducer";

const composeEnhancers = (typeof window !== "undefined" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const reducers = combineReducers({
  auth: authReducer,
  ui:uiReducer,
  notes:notesReducer
});
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))//si exsite el midellware de redux-thunk si no por defecto lo de arriba
);
