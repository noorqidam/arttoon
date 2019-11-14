import * as types from './../types'
import axios from 'axios'

export const handleGetMyEpisodes = (param) => ({
  type: types.GET_MY_EPISODES,
  payload: axios({
    method: 'GET',
    url: `http://192.168.0.23:5000/api/v1/user/${param.user}/webtoon/${param.webtoon}/episodes`,
    headers: {
      Authorization: `bearer ${param.token}`
    }
  })
});

export const handleAddMyEpisodes = (param) => ({
  type: types.ADD_MY_EPISODES,
  payload: axios({
    method: 'POST',
    url: `http://192.168.0.23:5000/api/v1/user/${param.user}/webtoon/${param.webtoon}/episode`,
    headers: {
      Authorization: `bearer ${param.token}`
    },
    data: param.data
  })
});

export const handleDeleteMyEpisodes = (param) => ({
  type: types.DELETE_MY_EPISODES,
  payload: axios({
    method: 'DELETE',
    url: `http://192.168.0.23:5000/api/v1/user/${param.user}
    /webtoon/${param.webtoon}/episode/${param.episode}`,
    headers: {
      Authorization: `bearer ${param.token}`
    }
  })
});

export const handleUpdateMyEpisodes = (param) => ({
  type: types.DELETE_MY_EPISODES,
  payload: axios({
    method: 'PATCH',
    url: `http://192.168.0.23:5000/api/v1/user/${param.user}
    /webtoon/${param.webtoon}/episode/${param.episode}`,
    headers: {
      Authorization: `bearer ${param.token}`
    },
    data: param.data
  })
});