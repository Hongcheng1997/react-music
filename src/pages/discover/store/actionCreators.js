import * as ActionTypes from './actionTypes'
import axios from '_axios'

export const getBanner = () => {
  return dispatch => {
    axios('banner').then(res => {
      (res.code === 200) && dispatch(getImgListAction(res.banners))
    })
  }
}

export const getSongSheet = () => {
  return dispatch => {
    axios('personalized', { limit: 10 }).then(res => {
      (res.code === 200) && dispatch(getSongSheetAction(res.result))
    })
  }
}

export function getImgListAction(value) {
  return { type: ActionTypes.IMGLIST, value }
}

export function getSongSheetAction(value) {
  return { type: ActionTypes.SONGSHEET, value }
}
