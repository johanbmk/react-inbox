import { combineReducers } from 'redux';
import {
  LOAD_MESSAGES,
  SET_STARRED,
  TOGGLE_SELECTED,
  SELECT_ALL_MESSAGES
} from '../actions';

export function messages(state = { ids: [], byId: {} }, action) {
  let newMessage;
  let changedMessagesById;

  switch (action.type) {

    case LOAD_MESSAGES:
      return {
        ids: action.messages.map((message) => {
          return message.id;
        }),
        byId: action.messages.reduce((result, message) => {
          result[message.id] = { ...message, selected: false };
          return result;
        }, {})
      }

    case SET_STARRED:
      newMessage = { ...state.byId[action.messageId] };
      newMessage.starred = action.starValue;
      return {
        ids: [ ...state.ids ],
        byId: { ...state.byId, [action.messageId]: newMessage }
      }

    case TOGGLE_SELECTED:
      newMessage = { ...state.byId[action.messageId] };
      newMessage.selected = !state.byId[action.messageId].selected;
      return {
        ids: [ ...state.ids ],
        byId: { ...state.byId, [action.messageId]: newMessage }
      }

    case SELECT_ALL_MESSAGES:
      let messageIdsToSelect = state.ids.filter(id => !state.byId[id].selected);
      if (messageIdsToSelect.length === 0) {
        // Means all messages are already selected, so instead, unselect them all.
        changedMessagesById = state.ids.reduce((result, id) => {
          result[id] = { ...state.byId[id], selected: false };
          return result;
        }, {})
      } else {
        changedMessagesById = messageIdsToSelect.reduce((result, id) => {
          result[id] = { ...state.byId[id], selected: true };
          return result;
        }, {})
      }
      return {
        ids: [ ...state.ids ],
        byId: { ...state.byId, ...changedMessagesById }
      }

    default:
      return state
  }
}

export default combineReducers({
  messages
})
