import { fromJS } from 'immutable'
import * as ActionTypes from './actionTypes'

const defaultState = fromJS({
  list: [],
  hotLabel: [],
  pageTotal: 0
})

export default (state = defaultState, action) => {
  if (action.type === ActionTypes.SONGSHEET) {
    return state.merge({
      list: fromJS(action.value.playlists),
      pageTotal: action.value.total
    })
  }
  if (action.type === ActionTypes.HOTLABEL) {
    return state.set('hotLabel', fromJS(action.value))
  }
  return state
}
