import { fromJS } from 'immutable'
import * as ActionTypes from './actionTypes'

const defaultState = fromJS({
  list: [],
  hotLabel: []
})

export default (state = defaultState, action) => {
  if (action.type === ActionTypes.SONGSHEET) {
    return state.set('list', fromJS(action.value))
  }
  if (action.type === ActionTypes.HOTLABEL) {
    return state.set('hotLabel', fromJS(action.value))
  }
  return state
}
