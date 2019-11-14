import * as types from './../types'
import axios from 'axios'

export const handlePostUsers = (data) => ({
  type: types.POST_USERS,
  payload: axios.post('http://192.168.0.23:5000/api/v1/login',
    data)
});

export const handleRegister = (data) => ({
  type: types.GET_USERS,
  payload: axios({
    method: 'post',
    url: `http://192.168.0.23:5000/api/v1/register`,
    data: data
  })
});