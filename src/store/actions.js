import * as ActionTypes from './actionTypes'

export function setPlayStatus(playStatus) {
  return { type: ActionTypes.SET_PLAY_STATUS, playStatus }
}

export function setPlayList(playList) {
  return { type: ActionTypes.SET_PLAY_List, playList }
}

export function setCurrentIndex(currentIndex) {
  return { type: ActionTypes.SET_CURRENTINDEX, currentIndex }
}
