export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const SET_STARRED = 'SET_STARRED';
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';

export function loadMessages(messages) {
  return {
    type: LOAD_MESSAGES,
    messages
  }
}

export function setStarState(messageId, starValue) {
  return {
    type: SET_STARRED,
    messageId,
    starValue
  }
}

export function toggleSelected(messageId) {
  return {
    type: TOGGLE_SELECTED,
    messageId
  }
}

export function fetchMessages() {
  return async (dispatch, getState, { api }) => {
    const state = getState();
    if (state.messages.ids.length) {
      // We already have messages in state.
      return;
    }
    const json = await api.fetchMessages();
    return dispatch(loadMessages(json._embedded.messages))
  }
}

export function toggleStarred(messageId) {
  return async (dispatch, getState, { api }) => {
    const state = getState();
    let newStarredValue = !state.messages.byId[messageId].starred;
    let requestBody = {
      messageIds: [messageId],
      command: 'star',
      star: newStarredValue
    };
    const response = await api.updateMessages(requestBody);
    if (response.status === 200) {
      return dispatch(setStarState(messageId, newStarredValue))
    }
  }
}
