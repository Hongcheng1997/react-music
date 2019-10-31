import * as ActionTypes from './actionTypes'

export function setPlayStatus(playStatus) {
  return { type: ActionTypes.SET_PLAY_STATUS, playStatus }
}