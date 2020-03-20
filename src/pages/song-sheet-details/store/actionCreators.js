import * as ActionTypes from './actionTypes'
import axios from '_axios'

export const getData = (id) => {
  return dispatch => {
    axios('/playlist/detail', { id }).then(res => {
      (res.code === 200) && dispatch(getImgListAction(res.playlist))
    })
  }
}

export function getImgListAction(value) {
  return { type: ActionTypes.PLAYLIST, value }
}
