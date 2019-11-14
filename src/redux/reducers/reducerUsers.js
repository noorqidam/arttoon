import * as types from '../types'

const initialState = {
  users: [{
    data: { token: null }
  }]
};

export default function reducerUsers(state = initialState, action) {
  switch (action.type) {
    case `${types.POST_USERS}_PENDING`:
      return {
        ...state,
        isLoading: true,
        users: state.users
      };

    case `${types.POST_USERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        users: action.payload
      };

    case `${types.POST_USERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
        users: state.users
      };
//-----------------------------------------------------------------------//
    case `${types.GET_USERS}_PENDING`:
      return {
        ...state,
        isLoading: true,
        users: state.users
      };

    case `${types.GET_USERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        users: action.payload
      };

    case `${types.GET_USERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
        users: state.users
      };
    default:
      return state;
  }
}