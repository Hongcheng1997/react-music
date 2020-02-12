import * as ActionTypes from './actionTypes'
import axios from '_axios'

export const getData = (id) => {
  return dispatch => {
    axios('/playlist/detail', { id }).then(res => {
      if (res.code === 200) {
        res.playlist.tracks = res.playlist.tracks.map(item => {
          item.dt = parseInt(item.dt.toFixed().substr(0, 3))
          return item
        })
        dispatch(getImgListAction(res.playlist))
      }
    })
  }
}

export function getImgListAction(value) {
  return { type: ActionTypes.PLAYLIST, value }
}
