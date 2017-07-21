import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchMessages } from '../actions'    // TODO: Dummy for now.
import Label from './Label.js';
import '../index.css';


class MessageRow extends Component {
  render() {
    let message = this.props.messagesById[this.props.messageId];
    let readClass = message.read ? 'read' : 'unread';
    let selectedClass = message.selected ? 'selected' : '';
    let starClass = message.starred ? 'star fa fa-star' : 'star fa fa-star-o';

    var labels = [];
    message.labels.forEach((labelText) => {
      labels.push(<Label text={labelText} key={labelText} />);
    });

    return (
      <div className={`row message ${readClass} ${selectedClass}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={message.selected}
                onChange={() => this.props.setProperty([message.id], 'selected', !message.selected)} />
            </div>
            <div className="col-xs-2">
              <i className={starClass}
                onClick={() => this.props.setProperty([message.id], 'starred', !message.starred)}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11 text-left">
          {labels}
          <a href="index.html">{message.subject}</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    messagesById: state.messages.byId
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMessages: fetchMessages             // TODO: Dummy for now.
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageRow)
