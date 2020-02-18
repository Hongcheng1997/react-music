import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
import * as ActionTypes from './actionTypes'
import { reducer as songSheetReducer } from '../pages/song-sheet/store'
import { reducer as songSheetDetailsReducer } from '../pages/song-sheet-details/store'

const defaultState = fromJS({
  playStatus: false,
  playList: [],
  currentIndex: 0,
  currentMusic: {},
  lyric: '',
  musicUrl: '',
  showPlayer: false
})

function commonReducers(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.SET_PLAY_STATUS:
      return state.set('playStatus', action.playStatus);
    case ActionTypes.SET_PLAY_List:
      return state.merge({
        playList: action.playList,
        currentIndex: 0,
        currentMusic: action.playList[0]
      });
    case ActionTypes.SET_CURRENTINDEX:
      return state.merge({
        currentIndex: action.currentIndex,
        currentMusic: state.getIn(['playList', action.currentIndex])
      });
    case ActionTypes.SET_MUSICURL:
      return state.set('musicUrl', action.url)
    case ActionTypes.SET_CURRENTLYRIC:
      return state.set('lyric', action.lyric)
    case ActionTypes.SET_SHOWPLAYER:
      return state.set('showPlayer', state.getIn(['currentMusic', 'id']) ? !state.get('showPlayer') : false)
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
