import { fromJS } from 'immutable'
import * as ActionTypes from './actionTypes'

const defaultState = fromJS({
  list: []
})

export default (state = defaultState, action) => {
  if (action.type === ActionTypes.SONGSHEET) {
    return state.set('list', fromJS(action.value))
  }
  return state
}
