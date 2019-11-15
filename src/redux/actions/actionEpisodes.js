import * as types from './../types'
import axios from 'axios'

export const handleGetEpisodes = (webtoonId) => ({
  type: types.GET_EPISODES,
  payload: axios.get(`https://restapi-arttoon.herokuapp.com/api/v1/webtoon/${webtoonId}/episodes`)

});