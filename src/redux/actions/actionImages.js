import * as types from './../types'
import axios from 'axios'

export const handleGetImages = (webtoonId, episode) => ({
  type: types.GET_IMAGES,
  payload: axios.get(
    `http://192.168.0.23:5000/api/v1/webtoon/${webtoonId}/episode/${episode}/images`
  )
});