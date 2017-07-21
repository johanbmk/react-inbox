import { combineReducers } from 'redux'
import { LOAD_MESSAGES, TOGGLE_STAR } from '../actions'

export function messages(state = { ids: [], byId: {} }, action) {
  switch (action.type) {

    case LOAD_MESSAGES:
      return {
        ids: action.messages.map((message) => {
          return message.id;
        }),
        byId: action.messages.reduce((result, message) => {
          result[message.id] = message;
          return result;
        }, {})
      }

    case TOGGLE_STAR:
      const { messageId } = action;
      let newMessage = { ...state.byId[messageId] };
      newMessage.starred = !state.byId[messageId].starred;
      return {
        ids: [...state.ids],
        byId: {
          ...state.byId, [messageId]: newMessage
        }
      }

    default:
      return state
  }
}

export default combineReducers({
  messages
})
