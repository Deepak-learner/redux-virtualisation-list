import { ActionTypes } from "../constants/action-types";

export const setList = (elements) => {
  return {
    type: ActionTypes.SET_LIST,
    payload: elements,
  };
};

export const setLoad = (elements) => {
  return {
    type: ActionTypes.SET_LOAD,
    payload: elements,
  };
};

export const setIndex = (elements) => {
  return {
    type: ActionTypes.SET_INDEX,
    payload: elements,
  };
};

export const setFetch = (elements) => {
  return {
    type: ActionTypes.SET_FETCH,
    payload: elements,
  };
};
