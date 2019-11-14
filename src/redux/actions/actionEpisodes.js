import * as types from './../types'
import axios from 'axios'

export const handleGetEpisodes = (webtoonId) => ({
  type: types.GET_EPISODES,
  payload: axios.get(`http://192.168.0.23:5000/api/v1/webtoon/${webtoonId}/episodes`)

});