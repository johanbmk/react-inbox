import React, { Component } from 'react';
import './App.css';
import Toolbar from './Toolbar.js';
import MessageTable from './MessageTable.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { messageIds: [], messagesById: {} };

    this.fetchMessages = this.fetchMessages.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.setPropertyUpdateState = this.setPropertyUpdateState.bind(this);
    this.selectAllMessages = this.selectAllMessages.bind(this);
  }

  async fetchMessages() {
    try {
      const response = await fetch('http://localhost:8181/api/messages');
      const json = await response.json();
      let messageIds = [];
      let messagesById = {};
      for (let i = 0; i < json._embedded.messages.length; i++) {
        let message = json._embedded.messages[i];
        let messageId = message.id;
        messagesById[messageId] = message;
        messageIds.push(messageId);
      }
      this.setState({ messageIds, messagesById });

    } catch(err) {
      console.error(err);
    }
  }

  componentDidMount() {
    this.fetchMessages();
  }

  async setProperty(messageIds, property, value) {
    let updateServer = false;
    let requestBody;

    if (property === 'starred') {
      updateServer = true;
      requestBody = {
        messageIds,
        command: 'star',
        star: value
      };
    } else if (property === 'read') {
      updateServer = true;
      requestBody = {
        messageIds,
        command: 'read',
        read: value
      };
    } else if (property === 'delete') {
      updateServer = true;
      requestBody = {
        messageIds,
        command: 'delete'
      };
    } else if (property === 'selected') {
      updateServer = false;
    } else {
      console.error('Unknown property:', property);
    }

    if (updateServer) {
      try {
        const response = await fetch('http://localhost:8181/api/messages', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PATCH",
          body: JSON.stringify(requestBody)
        });

        if (response.status === 200) {
          this.setPropertyUpdateState(messageIds, property, value);
        }
      } catch(err) {
        console.error('API problem:', err);
      }
    } else {
      this.setPropertyUpdateState(messageIds, property, value);
    }
  }

  setPropertyUpdateState(messageIds, property, value) {
    if (property === 'delete') {
      // Not really a property. It means to delete the messages.
      let newMessageIds = [];
      let newMessagesById = {};
      this.state.messageIds.filter(id => !messageIds.includes(id)).forEach(id => {
        // These are the messages we want to keep
        newMessageIds.push(id);
        newMessagesById[id] = this.state.messagesById[id];
      });
      this.setState((prevState) => {
        return {
          messageIds: newMessageIds,
          messagesById: newMessagesById
        }
      })
    } else {
      let changedMessagesById = {};
      messageIds.forEach((id) => {
        let message = this.state.messagesById[id];
        changedMessagesById[id] = { ...message, [property]: value };
      });
      this.setState((prevState) => {
        return {
          messageIds: prevState.messageIds,
          messagesById: { ...prevState.messagesById, ...changedMessagesById }
        }
      })
    }

  }

  selectAllMessages(selectedMessageIds) {
    let totalMessageCount = this.state.messageIds.length;
    if (selectedMessageIds.length === totalMessageCount) {
      // That means all messages are already selected, so unselect them all.
      this.setProperty(selectedMessageIds, 'selected', false);
    } else {
      let messageIdsToSelect = this.state.messageIds.filter(id => !this.state.messagesById[id].selected);
      this.setProperty(messageIdsToSelect, 'selected', true);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Toolbar messageIds={this.state.messageIds} messagesById={this.state.messagesById} selectAllMessages={this.selectAllMessages} setProperty={this.setProperty} />

          <MessageTable messageIds={this.state.messageIds} messagesById={this.state.messagesById} setProperty={this.setProperty} />
        </div>
      </div>
    )
  }
}

export default App;
