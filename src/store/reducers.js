import { combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'

// 初始数据
const initialState = {
  playStatus: false,
  playList: [],
  currentIndex: 0
}

function playStatus(playStatus = initialState.playStatus, action) {
  switch (action.type) {
    case ActionTypes.SET_PLAY_STATUS:
      return action.playStatus
    default:
      return playStatus
  }
}

function playList(playList = initialState.playList, action) {
  switch (action.type) {
    case ActionTypes.SET_PLAY_List:
      return action.playList
    default:
      return playList
  }
}

function currentIndex(currentIndex = initialState.currentIndex, action) {
  switch (action.type) {
    case ActionTypes.SET_CURRENTINDEX:
      return action.currentIndex
    default:
      return currentIndex
  }
}

const reducer = combineReducers({
  playStatus,
  playList,
  currentIndex
})

export default reducer
