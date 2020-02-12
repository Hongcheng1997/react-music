// import { combineReducers } from 'redux'
import { fromJS } from 'immutable'
import * as ActionTypes from './actionTypes'

const defaultState = fromJS({
  playStatus: true,
  playList: [{
    name: "绿洲",
    id: 1400047314,
    ar: [{
      id: 12002248,
      name: "沈以诚",
      tns: [],
      alias: []
    }],
    al: {
      id: 2801259,
      name: "rice & shine",
      picUrl: "https://p2.music.126.net/asKHHNuQsKDD39lvGoIqhw==/109951164457857234.jpg?param=34y34",
      tns: [],
      pic: 5962651557619306
    },
    dt: 243
  }],
  currentIndex: 0
})

const reducer = (state = defaultState, action) => {
  if (action.type === ActionTypes.SET_PLAY_STATUS) {
    return state.set('playStatus', action.playStatus)
  }
  if (action.type === ActionTypes.SET_PLAY_List) {
    return state.set('playList', action.playList)
  }
  if (action.type === ActionTypes.SET_CURRENTINDEX) {
    return state.set('currentIndex', action.currentIndex)
  }
  return state
}

export default reducer
