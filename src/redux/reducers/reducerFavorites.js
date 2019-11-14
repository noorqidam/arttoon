import * as types from '../types'

const initialState = {
  isLoading: false,
  isSuccess: false,
  needRefresh: false,
  favorites: [],
  messege:[]
};

export default function reducerFavorites(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_FAVORITES}_PENDING`:
      return {
        ...state,
        isLoading: true,
        needRefresh: false,
      };

    case `${types.GET_FAVORITES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: false,
        favorites: action.payload
      };

    case `${types.GET_FAVORITES}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
        needRefresh: false,
      };

    //==============================Add==============================//
    case `${types.ADD_FAVORITES}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.ADD_FAVORITES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        messege: action.payload
      };

    case `${types.ADD_FAVORITES}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    //==============================Delete==============================//
    case `${types.DELETE_FAVORITES}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.DELETE_FAVORITES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        messege: action.payload
      };

    case `${types.DELETE_FAVORITES}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
}