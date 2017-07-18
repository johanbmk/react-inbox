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
    this.setRead = this.setRead.bind(this);
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
    } else if (property === 'selected') {
      updateServer = false;
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
        console.error('Problems starring a message:', err);
      }
    } else {
      this.setPropertyUpdateState(messageIds, property, value);
    }
  }

  setPropertyUpdateState(messageIds, property, value) {
    // Meant to ba called from inside setProperty
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

  setRead(messages, value) {
    this.setState((prevState) => {
      let tempMessages = prevState.messages.slice();
      messages.forEach((message) => {
        let index = tempMessages.indexOf(message);
        tempMessages[index].read = value;
      });
      return {
        messages: tempMessages
      }
    })
  }

  selectAllMessages() {
    this.setState((prevState) => {
      let totalMessageCount = prevState.messages.length;
      let selectedMessageCount = prevState.messages.reduce((count, msg) => {
        return msg.selected ? count + 1 : count + 0;
      }, 0);
      let newValue = selectedMessageCount === totalMessageCount ? false : true;
      return {
        messages: prevState.messages.map((msg) => {
          msg.selected = newValue;
          return msg;
        })
      }
    })
  }

  render() {

    return (
      <div className="App">
        <div className="container">
          <Toolbar messageIds={this.state.messageIds} messagesById={this.state.messagesById} selectAllMessages={this.selectAllMessages} setRead={this.setRead} />

          <MessageTable messageIds={this.state.messageIds} messagesById={this.state.messagesById} setProperty={this.setProperty} />
        </div>
      </div>
    )
  }
}

export default App;
