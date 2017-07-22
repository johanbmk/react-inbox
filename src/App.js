import React, { Component } from 'react';
// import { connect } from 'react-redux'
import './App.css';
import Toolbar from './components/Toolbar.js';
// import ComposeForm from './components/ComposeForm.js';
import MessageTable from './components/MessageTable.js';

class App extends Component {
  constructor(props) {
    super(props);

    // this.state = { composeMode: false, messageIds: [], messagesById: {} };

    this.fetchMessages = this.fetchMessages.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.setPropertyUpdateState = this.setPropertyUpdateState.bind(this);
    this.selectAllMessages = this.selectAllMessages.bind(this);
    this.toggleComposeMode = this.toggleComposeMode.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
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
      console.error('Error fetching messages:', err);
    }
  }

  // componentDidMount() {
  //   this.fetchMessages();
  // }

  async setProperty(messageIds, property, value, label) {
    // 'label' is just for labels
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
    } else if (property === 'label') {
      updateServer = true;
      let filteredMessageIds = value ?
        messageIds.filter((id) => !this.state.messagesById[id].labels.includes(label)) :
        messageIds.filter((id) => this.state.messagesById[id].labels.includes(label));
      requestBody = {
        messageIds: filteredMessageIds,
        command: value ? 'addLabel' : 'removeLabel',
        label
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
          this.setPropertyUpdateState(messageIds, property, value, label);
        } else {
          console.error('API problem. Expected response status 200 but got:', response.status);
        }
      } catch(err) {
        console.error('API error:', err);
      }
    } else {
      this.setPropertyUpdateState(messageIds, property, value);
    }
  }

  setPropertyUpdateState(messageIds, property, value, label) {
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
    } else if (property === 'label') {
      let filteredMessageIds = value ?
        messageIds.filter((id) => !this.state.messagesById[id].labels.includes(label)) :
        messageIds.filter((id) => this.state.messagesById[id].labels.includes(label));

      let changedMessagesById = {};
      filteredMessageIds.forEach((id) => {
        let newLabels;
        let message = this.state.messagesById[id];
        if (value) {
          // Add label to labels array for this message
          newLabels = message.labels.slice();
          newLabels.push(label);
        } else {
          // Remove label from labels array for this message
          newLabels = message.labels.filter((lbl) => lbl !== label);
        }
        changedMessagesById[id] = { ...message, labels: newLabels };
      })
      this.setState((prevState) => {
        return {
          messageIds: prevState.messageIds,
          messagesById: { ...prevState.messagesById, ...changedMessagesById }
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

  toggleComposeMode() {
    this.setState((prevState) => {
      return {
        composeMode: !prevState.composeMode
      }
    })
  }

  async sendMessage(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8181/api/messages', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          subject: event.target.subject.value,
          body: event.target.body.value
        })
      });
      if (response.status === 200) {
        const json = await response.json();
        let newMessagesById = {};
        newMessagesById[json.id] = {
          id: json.id,
          subject: json.subject,
          starred: false,
          read: false,
          labels: [],
          body: json.body
        };
        this.setState((prevState) => {
          return {
            messageIds: [...prevState.messageIds, json.id],
            messagesById: {...prevState.messagesById, ...newMessagesById}
          }
        });
      } else {
        console.error('API problem. Expected response status 200 but got:', response.status);
      }
    } catch(err) {
      console.error('API error:', err);
    }
    this.toggleComposeMode();
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          {/* <Toolbar
            messageIds={this.state.messageIds}
            messagesById={this.state.messagesById}
            selectAllMessages={this.selectAllMessages}
            setProperty={this.setProperty}
            toggleComposeMode={this.toggleComposeMode} /> */}
          <Toolbar />

          {/* <ComposeForm
            composeMode={this.state.composeMode}
            sendMessage={this.sendMessage} /> */}

          <MessageTable />
        </div>
      </div>
    )
  }
}

export default App;
