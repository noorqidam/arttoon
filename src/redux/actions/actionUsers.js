import * as types from './../types'
import axios from 'axios'

export const handlePostUsers = (data) => ({
  type: types.POST_USERS,
  payload: axios.post('https://restapi-arttoon.herokuapp.com/api/v1/login',
    data)
});

export const handleRegister = (data) => ({
  type: types.GET_USERS,
  payload: axios({
    method: 'post',
    url: `https://restapi-arttoon.herokuapp.com/api/v1/register`,
    data: data
  })
});