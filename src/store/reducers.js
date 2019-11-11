import { combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'

// 初始数据
const initialState = {
  playStatus: false,
  playList: [{
    "name": "绿洲",
    "id": 1400047314,
    "ar": [{
      "id": 12002248,
      "name": "沈以诚",
      "tns": [],
      "alias": []
    }],
    "al": {
      "id": 2801259,
      "name": "rice & shine",
      "picUrl": "https://p2.music.126.net/asKHHNuQsKDD39lvGoIqhw==/109951164457857234.jpg?param=34y34",
      "tns": [],
      "pic": 5962651557619306
    },
    "dt": 243
  }],
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
