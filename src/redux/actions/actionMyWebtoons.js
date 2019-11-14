import * as types from './../types'
import axios from 'axios'

export const handleGetMyWebtoons = (param) => ({
  type: types.GET_MY_WEBTOONS,
  payload: axios({
    method: 'GET',
    url: `http://192.168.0.23:5000/api/v1/user/${param.user}/webtoons`,
    headers: {
      Authorization: `bearer ${param.token}`
    }
  })
});

export const handleAddMyWebtoons = (param) => ({
  type: types.ADD_MY_WEBTOONS,
  payload: axios({
    method: 'POST',
    url: `http://192.168.0.23:5000/api/v1/user/${param.user}/webtoon`,
    headers: {
      Authorization: `bearer ${param.token}`
    },
    data: param.data
  })
});

export const handleDeleteMyWebtoons = (param) => ({
  type: types.DELETE_MY_WEBTOONS,
  payload: axios({
    method: 'DELETE',
    url: `http://192.168.0.23:5000/api/v1/user/${param.user}/webtoon/${param.webtoon}`,
    headers: {
      Authorization: `bearer ${param.token}`
    }
  })
});

export const handleUpdateMyWebtoons = (param) => ({
  type: types.UPDATE_MY_WEBTOONS,
  payload: axios({
    method: 'PATCH',
    url: `http://192.168.0.23:5000/api/v1/user/${param.user}/webtoon/${param.webtoon}`,
    headers: {
      Authorization: `bearer ${param.token}`
    },
    data: param.data
  })
});

export const handleAddPhotoMyWebtoons = (param) => ({
  type: types.UPLOAD_PHOTO_MY_WEBTOONS,
  payload: axios({
    method: 'POST',
    url: 'https://us-central1-arttoon-8f9ef.cloudfunctions.net/uploadFile',
    headers: {
      Authorization: `bearer ${param.token}`
    },
    data: param.data
  })
});