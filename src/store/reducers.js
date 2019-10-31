import { combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'

// 初始数据
const initialState = {
  playStatus: false
}

function playStatus(playStatus = initialState.playStatus, action) {
  switch (action.type) {
    case ActionTypes.SET_PLAY_STATUS:
      return action.playStatus
    default:
      return playStatus
  }
}

const reducer = combineReducers({
  playStatus
})

export default reducer
