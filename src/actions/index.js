export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const SET_STARRED = 'SET_STARRED';
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export const SELECT_ALL_MESSAGES = 'SELECT_ALL_MESSAGES';
export const SET_READ = 'SET_READ';
export const SET_LABEL = 'SET_LABEL';
export const DELETE_MESSAGES = 'DELETE_MESSAGES';

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

export function selectAllMessages() {
  return {
    type: SELECT_ALL_MESSAGES
  }
}

export function setReadState(messageIds, value) {
  return {
    type: SET_READ,
    messageIds,
    value
  }
}

export function setLabelState(messageIds, label, value) {
  return {
    type: SET_LABEL,
    messageIds,
    label,
    value
  }
}

export function deleteFromState(messageIds) {
  return {
    type: DELETE_MESSAGES,
    messageIds
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

export function setReadForSelected(value) {
  return async (dispatch, getState, { api }) => {
    const state = getState();
    let selectedMessageIds = state.messages.ids.filter(id => state.messages.byId[id].selected);
    let requestBody = {
      messageIds: selectedMessageIds,
      command: 'read',
      read: value
    };
    const response = await api.updateMessages(requestBody);
    if (response.status === 200) {
      return dispatch(setReadState(selectedMessageIds, value))
    }
  }
}

export function setLabelForSelected(label, value) {
  return async (dispatch, getState, { api }) => {
    const state = getState();
    let selectedMessageIds = state.messages.ids.filter(id => state.messages.byId[id].selected);
    let requestBody = {
      messageIds: selectedMessageIds,
      command: value ? 'addLabel': 'removeLabel',
      label: label
    };
    const response = await api.updateMessages(requestBody);
    if (response.status === 200) {
      return dispatch(setLabelState(selectedMessageIds, label, value))
    }
  }
}

export function deleteSelected() {
  return async (dispatch, getState, { api }) => {
    const state = getState();
    let selectedMessageIds = state.messages.ids.filter(id => state.messages.byId[id].selected);
    let requestBody = {
      messageIds: selectedMessageIds,
      command: 'delete'
    };
    const response = await api.updateMessages(requestBody);
    if (response.status === 200) {
      return dispatch(deleteFromState(selectedMessageIds))
    }
  }
}
