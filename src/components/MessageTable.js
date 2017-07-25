import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../index.css';
import { fetchMessages } from '../actions'
import MessageRow from './MessageRow.js';


class MessageTable extends Component {
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
        rows.push(<MessageRow messageId={id} key={id} match={this.props} />);
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
    messageIds: state.messages.ids
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMessages: fetchMessages
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageTable)
