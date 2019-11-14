import * as types from './../types'
import axios from 'axios'
import { Body } from 'native-base';

export const handleGetMyImages = (param) => ({
    type: types.GET_MY_IMAGES,
    payload: axios({
        method: 'GET',
        url: `http://192.168.0.23:5000/api/v1/user/${param.user}/webtoon/${param.webtoon}/episode/${param.episode}/images`,
        headers: {
            Authorization: `bearer ${param.token}`
        }
    })
});

export const handleAddMyImages = (param) => ({
    type: types.ADD_MY_IMAGES,
    payload: axios({
        method: 'POST',
        url: `http://192.168.0.23:5000/api/v1/user/${param.user}/webtoon/${param.webtoon}/episode/${param.episode}/image`,
        headers: {
            Authorization: `bearer ${param.token}`
        },
        data: param.data
    })
});

export const handleDeleteMyImages = (param) => ({
    type: types.DELETE_MY_IMAGES,
    payload: axios({
        method: 'DELETE',
        url: `http://192.168.0.23:5000/api/v1/user/${param.user}/webtoon/${param.webtoon}/episode/${param.episode}/image/${param.image}`,
        headers: {
            Authorization: `bearer ${param.token}`
        }
    })
});

export const handleUpdateMyImages = (param) => ({
    type: types.UPDATE_MY_IMAGES,
    payload: axios({
        method: 'PATCH',
        url: `http://192.168.0.23:5000/api/v1/user/${param.user}/webtoon/${param.webtoon}/episode/${param.episode}/image/${param.image}`,
        headers: {
            Authorization: `bearer ${param.token}`
        },
        data: param.data
    })
});