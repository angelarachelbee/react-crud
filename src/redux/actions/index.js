import * as constants from "../constants/action-types";

export const login = ( payload ) => ({
  type: constants.LOGIN,
  payload
});

export const get = ( query ) => ({
  type: constants.GET,
  payload: {
      query,
  },
});
export const set = (data) => ({
  type: constants.SET,
  payload: {
      userList : data,
  },
});

export const setUser = data => ({
  type: constants.SET_USER,
  payload: {
    user: data
  }
});
export const setTotal = (data) => ({
  type: constants.SET_TOTAL,
  payload: {
      total_pages : data,
  },
});
export const setNextPage = ( data) => ({
  type: constants.SET_NEXT_PAGE,
  payload: {
      next_page : data,
  },
});