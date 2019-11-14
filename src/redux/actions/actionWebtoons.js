import * as types from './../types'
import axios from 'axios'

export const handleGetWebtoons = () => ({
  type: types.GET_WEBTOONS,
  payload: axios.get('http://192.168.0.23:5000/api/v1/webtoons')
});
