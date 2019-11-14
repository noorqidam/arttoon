import * as types from '../types'

const initialState = {
  isLoading: false,
  isSuccess: false,
  needRefresh: false,
  episodes: []
};

export default function reducerImages(state = initialState, action) {
    switch (action.type) {
      case `${types.GET_EPISODES}_PENDING`:
        return {
          ...state,
          isLoading: true,
          episodes: state.episodes
        };
  
      case `${types.GET_EPISODES}_FULFILLED`:
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          episodes: action.payload
        };
  
      case `${types.GET_EPISODES}_REJECTED`:
        return {
          ...state,
          isLoading: false,
          isError: true,
          episodes: state.episodes
        };
    default:
      return state;
  }
}