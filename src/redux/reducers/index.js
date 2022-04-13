import { combineReducers } from "redux";
import { listReducer } from "./listReducers";
import { loadReducer } from "./listReducers";
import { indexReducer } from "./listReducers";
import { fetchReducer } from "./listReducers";

const reducers = combineReducers({
  allElements: listReducer,
  loading: loadReducer,
  index: indexReducer,
  fetch: fetchReducer,
});
export default reducers;
