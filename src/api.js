export default class api {
  static fetchMessages() {
    return fetch('http://localhost:8181/api/messages')
    .then(response => response.json());
  }

  static fetchMessage(id) {
    return fetch(`http://localhost:8181/api/messages/${id}`)
    .then(response => response.json());
  }

  static updateMessages(requestBody) {
    return fetch('http://localhost:8181/api/messages', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(requestBody)
    });
  }

  static sendMessage(requestBody) {
    return fetch('http://localhost:8181/api/messages', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(requestBody)
    });
  }
}
