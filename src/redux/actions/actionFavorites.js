import * as types from './../types'
import axios from 'axios'

export const handleGetFavorites = (param) => ({
  type: types.GET_FAVORITES,
  payload: axios({
    method: 'GET',
    url: `https://restapi-arttoon.herokuapp.com/api/v1/user/${param.user}/favorites`,
    headers: {
      Authorization: `bearer ${param.token}`
    }
  })
});

export const handleAddFavorites = (param) => ({
  type: types.ADD_FAVORITES,
  payload: axios({
    method: 'POST',
    url: `https://restapi-arttoon.herokuapp.com/api/v1/user/${param.user}/favorite`,
    headers: {
      Authorization: `bearer ${param.token}`
    },
    data: param.data
  })
});

export const handleDeleteFavorites = (param) => ({
  type: types.DELETE_FAVORITES,
  payload: axios({
    method: 'DELETE',
    url: `https://restapi-arttoon.herokuapp.com/api/v1/user/${param.user}/favorite/${param.webtoon}`,
    headers: {
      Authorization: `bearer ${param.token}`
    }
  })
});