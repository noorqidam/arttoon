import * as types from '../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  webtoons: []

};

export default function reducerWebtoons(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_WEBTOONS}_PENDING`:
      return {
        ...state,
        isLoading: true,
        webtoons: state.webtoons
      };

    case `${types.GET_WEBTOONS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        webtoons: action.payload
      };

    case `${types.GET_WEBTOONS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
        webtoons: state.webtoons
      };
    default:
      return state;
  }
}