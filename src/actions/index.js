export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export function loadMessages(messages) {
  return {
    type: LOAD_MESSAGES,
    messages
  }
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message
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
