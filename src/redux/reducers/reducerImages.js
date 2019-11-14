import * as types from '../types'

const initialState = {
  isLoading: false,
  isSuccess: false,
  needRefresh: false,
  images: []
};

export default function reducerImages(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_IMAGES}_PENDING`:
      return {
        ...state,
        isLoading: true,
        images: state.images
      };

    case `${types.GET_IMAGES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        images: action.payload
      };

    case `${types.GET_IMAGES}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
        images: state.images
      };
    default:
      return state;
  }
}