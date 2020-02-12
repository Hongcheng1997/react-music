import { fromJS } from 'immutable'
import * as ActionTypes from './actionTypes'

const defaultState = fromJS({
  imgList: [],
  songSheet: []
})

export default (state = defaultState, action) => {
  if (action.type === ActionTypes.IMGLIST) {
    return state.set('imgList', fromJS(action.value))
  }
  if (action.type === ActionTypes.SONGSHEET) {
    return state.set('songSheet', fromJS(action.value))
  }
  return state
}
