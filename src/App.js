import React, { Component } from 'react';
import './App.css';
import Toolbar from './Toolbar.js';
import MessageTable from './MessageTable.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { messages: [] };

    this.setMessages = this.setMessages.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
    this.toggleProperty = this.toggleProperty.bind(this);
    this.setRead = this.setRead.bind(this);
    this.selectAllMessages = this.selectAllMessages.bind(this);
  }

  setMessages(result) {
    this.setState({ messages: result._embedded.messages });
  }

  async fetchMessages() {
    try {
      const response = await fetch('http://localhost:8181/api/messages');
      const result = await response.json();
      this.setMessages(result);
    } catch(err) {
      console.error(err);
    }
  }

  componentDidMount() {
    this.fetchMessages();
  }

  toggleProperty(message, property) {
    this.setState((prevState) => {
      const index = prevState.messages.indexOf(message);
      return {
        messages: [
          ...prevState.messages.slice(0, index),
          { ...message, [property]: !message[property] },
          ...prevState.messages.slice(index + 1),
        ]
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
          <Toolbar messages={this.state.messages} selectAllMessages={this.selectAllMessages} setRead={this.setRead} />
          <MessageTable messages={this.state.messages} toggleProperty={this.toggleProperty} />
        </div>
      </div>
    )
  }
}

export default App;
