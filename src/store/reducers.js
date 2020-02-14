import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
import * as ActionTypes from './actionTypes'
import { reducer as songSheetReducer } from '../pages/song-sheet/store'
import { reducer as songSheetDetailsReducer } from '../pages/song-sheet-details/store'

const defaultState = fromJS({
  playStatus: false,
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

function commonReducers(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.SET_PLAY_STATUS:
      return state.set('playStatus', action.playStatus);
    case ActionTypes.SET_PLAY_List:
      return state.merge({
        playList: action.playList,
        currentIndex: 0
      });
    case ActionTypes.SET_CURRENTINDEX:
      return state.set('currentIndex', action.currentIndex);
    default:
      return state
  }
}

const reducer = combineReducers({
  common: commonReducers,
  songSheet: songSheetReducer,
  songSheetDetails: songSheetDetailsReducer
})

export default reducer
