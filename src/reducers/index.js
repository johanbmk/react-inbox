import { combineReducers } from 'redux';
import {
  LOAD_MESSAGES,
  LOAD_MESSAGE_BODY,
  SET_STARRED,
  TOGGLE_SELECTED,
  SELECT_ALL_MESSAGES,
  SET_READ,
  SET_LABEL,
  DELETE_MESSAGES,
  ADD_MESSAGE
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

    case SET_READ:
      changedMessagesById = action.messageIds.reduce((result, id) => {
        result[id] = { ...state.byId[id], read: action.value };
        return result;
      }, {})
      return {
        ids: [ ...state.ids ],
        byId: { ...state.byId, ...changedMessagesById }
      }

    case SET_LABEL:
      let filteredMessageIds = action.value ?
        action.messageIds.filter(id => !state.byId[id].labels.includes(action.label)) :
        action.messageIds.filter(id => state.byId[id].labels.includes(action.label));

      changedMessagesById = {};
      filteredMessageIds.forEach(id => {
        let newLabels;
        let message = state.byId[id];
        if (action.value) {
          // Add label to labels array for this message
          newLabels = [ ...message.labels, action.label];
        } else {
          // Remove label from labels array for this message
          newLabels = message.labels.filter(lbl => lbl !== action.label);
        }
        changedMessagesById[id] = { ...message, labels: newLabels };
      })
      return {
        ids: [ ...state.ids ],
        byId: { ...state.byId, ...changedMessagesById }
      }

    case DELETE_MESSAGES:
      let remainingMessagesIds = state.ids.filter(id => !action.messageIds.includes(id));
      let remainingMessagesById = remainingMessagesIds.reduce((result, id) => {
        result[id] = { ...state.byId[id] };
        return result;
      }, {})
      return {
        ids: [ ...remainingMessagesIds ],
        byId: { ...remainingMessagesById }
      }

    case ADD_MESSAGE:
      let newMessagesById = {};
      newMessagesById[action.message.id] = { ...action.message, selected: false };
      delete newMessagesById[action.message.id].body;
      return {
        ids: [ ...state.ids, action.message.id ],
        byId: { ...state.byId, ...newMessagesById }
      }

    default:
      return state
  }
}


export function viewedMessage(state = { body: '' }, action) {
  switch (action.type) {

    case LOAD_MESSAGE_BODY:
      return { body: action.messageBody }

    default:
      return state

  }
}


export default combineReducers({
  messages,
  viewedMessage
})
