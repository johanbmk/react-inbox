import React, { Component } from 'react';
import '../index.css';
import MessageRow from './MessageRow.js';

// Available:
// this.props.messageIds
// this.props.messagesById
// this.props.setProperty

class MessageTable extends Component {
  render() {
    var rows = [];
    this.props.messageIds.forEach((id) => {
      rows.push(<MessageRow message={this.props.messagesById[id]} key={id}
        setProperty={this.props.setProperty} />);
    });

    return (
      <div className="MessageTable">
        {rows}
      </div>
    )
  }
}

export default MessageTable;
