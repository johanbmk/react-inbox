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

    this.state = {
      messages,
    };

    this.updateState = this.updateState.bind(this);
    this.selectAllMessages = this.selectAllMessages.bind(this);
  }

  updateState(messageId, change) {
    let messages = this.state.messages;
    let message = messages.find(msg => msg.id === messageId);
    if (change === 'toggleStar') {
      message.starred = !message.starred;
    } else if (change === 'toggleSelected') {
      message.selected = !message.selected;
    }
    this.setState({messages});
  }

  selectAllMessages() {
    let messages = this.state.messages;
    let totalMessageCount = messages.length;
    let selectedMessageCount = messages.reduce((count, msg) => {
      return msg.selected ? count + 1 : count + 0;
    }, 0);
    let newValue = selectedMessageCount === totalMessageCount ? false : true;
    for (let message of messages) {
      message.selected = newValue;
    }
    this.setState({messages});
  }

  render() {

    return (
      <div className="App">
        <div className="container">
          <Toolbar messages={this.state.messages} selectAllMessages={this.selectAllMessages} />
          <MessageTable messages={this.state.messages} updateState={this.updateState} />
        </div>
      </div>
    )
  }
}

export default App;
