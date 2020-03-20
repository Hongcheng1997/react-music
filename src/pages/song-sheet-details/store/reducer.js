import { fromJS } from 'immutable'
import * as ActionTypes from './actionTypes'

const defaultState = fromJS({
  playList: []
})

export default (state = defaultState, action) => {
  if (action.type === ActionTypes.PLAYLIST) {
    return state.set('playList', fromJS(action.value))
  }
  return state
}
