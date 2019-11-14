import * as types from '../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isImgLoading: false,
  isImgError: false,
  isImgSuccess: false,
  needRefresh: false,
  webtoons: []
};

export default function reducerMyWebtoons(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_MY_WEBTOONS}_PENDING`:
      return {
        ...state,
        isLoading: true,
        needRefresh: false,
      };

    case `${types.GET_MY_WEBTOONS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: false,
        webtoons: action.payload
      };

    case `${types.GET_MY_WEBTOONS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
        needRefresh: false,
      };

    //==============================Add My Webtoon==============================//
    case `${types.ADD_MY_WEBTOONS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.ADD_MY_WEBTOONS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        webtoons: action.payload
      };

    case `${types.ADD_MY_WEBTOONS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    //==============================Delete My Webtoon==============================//
    case `${types.DELETE_MY_WEBTOONS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.DELETE_MY_WEBTOONS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        webtoons: action.payload
      };

    case `${types.DELETE_MY_WEBTOONS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };


    //==============================Update My Webtoon==============================//
    case `${types.UPDATE_MY_WEBTOONS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.UPDATE_MY_WEBTOONS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        webtoons: action.payload
      };

    case `${types.UPDATE_MY_WEBTOONS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    //==============================Upload Photo==============================//
    case `${types.UPLOAD_PHOTO_MY_WEBTOONS}_PENDING`:
      return {
        ...state,
        isImgLoading: true
      };

    case `${types.UPLOAD_PHOTO_MY_WEBTOONS}_FULFILLED`:
      return {
        ...state,
        isImgLoading: false,
        isImgSuccess: true,
        imageUrl: action.payload.data.url
      };

    case `${types.UPLOAD_PHOTO_MY_WEBTOONS}_REJECTED`:
      return {
        ...state,
        isImgLoading: false,
        isImgError: true,
      };
    default:
      return state;
  }
}