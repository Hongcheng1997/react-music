import * as ActionTypes from './actionTypes'
import axios from '_axios'

export const getSongSheet = () => {
  return dispatch => {
    axios('personalized', { limit: 18 }).then(res => {
      (res.code === 200) && dispatch(getSongSheetAction(res.result))
    })
  }
}

export function getSongSheetAction(value) {
  return { type: ActionTypes.SONGSHEET, value }
}
