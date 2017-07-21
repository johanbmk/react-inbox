import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../index.css';
import MessageRow from './MessageRow.js';
import { fetchMessages } from '../actions'


export class MessageTable extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    if (!this.props.messageIds) {
      return (
        <div>Loading...</div>
      )
    } else {
      let rows = [];
      this.props.messageIds.forEach((id) => {
        rows.push(<MessageRow message={this.props.messagesById[id]} key={id} />);
      });
      return (
        <div className="MessageTable">
          {rows}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    messageIds: state.messages.ids,
    messagesById: state.messages.byId
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMessages: fetchMessages
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageTable)
