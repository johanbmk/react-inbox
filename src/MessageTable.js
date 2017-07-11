import React, { Component } from 'react';
import './index.css';
import MessageRow from './MessageRow.js';

class MessageTable extends Component {
  render() {
    var rows = [];
    this.props.messages.forEach((message) => {
      rows.push(<MessageRow message={message} key={message.id} />);
    });
    return (
      <div className="MessageTable">
        {rows}
      </div>
    )
  }
}

export default MessageTable;
