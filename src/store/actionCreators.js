import axios from '_axios'
import * as ActionTypes from './actionTypes'

function getUrlAction(url) {
  return { type: ActionTypes.SET_MUSICURL, url }
}

function getLyricAction(lyric) {
  return { type: ActionTypes.SET_CURRENTLYRIC, lyric }
}

export function getPlayStatusAction(playStatus) {
  return { type: ActionTypes.SET_PLAY_STATUS, playStatus }
}

export function getPlayListAction(playList) {
  return { type: ActionTypes.SET_PLAY_List, playList }
}

export function getCurrentIndexAction(currentIndex) {
  return { type: ActionTypes.SET_CURRENTINDEX, currentIndex }
}

export function getShowPlayerAction() {
  return { type: ActionTypes.SET_SHOWPLAYER }
}

export function getTimeToLyricAction(time) {
  return { type: ActionTypes.SET_TIMETOLYRIC, time }
}

// id 466122271
export const getMusicUrl = id => {
  return dispatch => {
    axios('/song/url', { id }).then(res => {
      if (res.code === 200) {
        if (res.data[0].url) {
          // 派发 action 修改 redux 的 musicUrl
          dispatch(getUrlAction(res.data[0].url))
          // 如果有 url，再去获取歌词
          dispatch(getLyric(id))
        } else {
          // 没有音乐链接
        }
      }
    })
  }
}

const getLyric = id => {
  return dispatch => {
    axios('/lyric', { id }).then(res => {
      if (res.code === 200 && !res.nolyric) {
        dispatch(getLyricAction(res.lrc.lyric))
      } else {
        dispatch(getLyricAction(''))
      }
    })
  }
}
