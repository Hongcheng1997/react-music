import { combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'

// 初始数据
const initialState = {
  num: false //Player显示状态
}

function num(num = initialState.num, action) {
  switch (action.type) {
    case ActionTypes.SET_SHOW_PLAYER:
      return action.num
    default:
      return num
  }
}

const reducer = combineReducers({
  num
})

export default reducer
