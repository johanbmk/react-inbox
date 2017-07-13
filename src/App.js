import React, { Component } from 'react';
import './App.css';
import Toolbar from './Toolbar.js';
import MessageTable from './MessageTable.js';

const messages = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

class App extends Component {
  constructor(props) {
    super(props);

    let newMessages = messages.map(msg => {
      let newMsg = msg;
      msg.selected = false;
      return newMsg;
    });

    this.state = {
      messages: newMessages
    };

    this.toggleMessageSelected = this.toggleMessageSelected.bind(this);
    this.selectAllMessages = this.selectAllMessages.bind(this);
  }

  toggleMessageSelected(messageId) {
    let newMessages = this.state.messages;
    let message = newMessages.find(msg => msg.id === messageId);
    message.selected = !message.selected;
    this.setState({messages: newMessages});
  }

  selectAllMessages() {
    console.log("Hello from 'selectAllMessages'!");
  }

  render() {

    return (
      <div className="App">
        <div className="container">
          <Toolbar messages={this.state.messages}
            selectAllMessages={this.selectAllMessages} />
          <MessageTable
            messages={this.state.messages}
            toggleMessageSelected={this.toggleMessageSelected} />
        </div>
      </div>
    )
  }
}

export default App;

// Old stuff
// <Toolbar messageCount={this.state.messages.filter((msg) => !msg.read).length} />
