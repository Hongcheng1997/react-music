import * as ActionTypes from './actionTypes'
import axios from '_axios'

export const getSongSheet = (params) => {
  return dispatch => {
    axios('/top/playlist', params).then(res => {
      (res.code === 200) && dispatch(getSongSheetAction(res.playlists))
    })
  }
}

export const getHotLabel = () => {
  return dispatch => {
    axios('playlist/catlist').then(res => {
      (res.code === 200) && dispatch(getHotLabelAction([res.all, ...res.sub]))
    })
  }
}

export function getSongSheetAction(value) {
  return { type: ActionTypes.SONGSHEET, value }
}

export function getHotLabelAction(value) {
  return { type: ActionTypes.HOTLABEL, value }
}
