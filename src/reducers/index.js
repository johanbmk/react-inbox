import { combineReducers } from 'redux'
import { LOAD_MESSAGES, ADD_MESSAGE } from '../actions'

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

    case ADD_MESSAGE:
      const { message } = action;
      return {
        ids: [...state.messageIds, message.id],
        byId: {
          ...state.byId,
          [message.id]: message
        }
      }

    default:
      return state
  }
}

export default combineReducers({
  messages
})
