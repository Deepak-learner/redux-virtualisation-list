import { ActionTypes } from "../constants/action-types";

const intialState = {
  list: [],
};

export const listReducer = (state = intialState, { type, payload }) => {
  console.log("s", state, payload, type);
  switch (type) {
    case ActionTypes.SET_LIST:
      console.log("debug", state, payload);
      return { ...state, list: payload };
    default:
      return state;
  }
};

export const loadReducer = (state = true, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_LOAD:
      return payload;
    default:
      return state;
  }
};

export const indexReducer = (state = 10, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_INDEX:
      return payload;
    default:
      return state;
  }
};

export const fetchReducer = (state = false, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_FETCH:
      return payload;
    default:
      return state;
  }
};
