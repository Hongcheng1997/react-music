import * as ActionTypes from './actionTypes'

export function getPlayStatusAction(playStatus) {
  return { type: ActionTypes.SET_PLAY_STATUS, playStatus }
}

export function getPlayListAction(playList) {
  return { type: ActionTypes.SET_PLAY_List, playList }
}

export function getCurrentIndexAction(currentIndex) {
  return { type: ActionTypes.SET_CURRENTINDEX, currentIndex }
}
