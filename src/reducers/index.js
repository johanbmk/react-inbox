import { combineReducers } from 'redux'
import { LOAD_MESSAGES, SET_STARRED, TOGGLE_SELECTED } from '../actions'

export function messages(state = { ids: [], byId: {} }, action) {
  switch (action.type) {

    case LOAD_MESSAGES:
      return {
        ids: action.messages.map((message) => {
          return message.id;
        }),
        byId: action.messages.reduce((result, message) => {
          result[message.id] = message;
          result[message.id].selected = false;
          return result;
        }, {})
      }

    case SET_STARRED:
      let { messageId, starValue } = action;
      let newMessage = { ...state.byId[messageId] };
      newMessage.starred = starValue;
      return {
        ids: [ ...state.ids ],
        byId: { ...state.byId, [messageId]: newMessage }
      }

    case TOGGLE_SELECTED:
      newMessage = { ...state.byId[action.messageId] };
      newMessage.selected = !state.byId[action.messageId].selected;
      return {
        ids: [ ...state.ids ],
        byId: { ...state.byId, [action.messageId]: newMessage }
      }

    default:
      return state
  }
}

export default combineReducers({
  messages
})
