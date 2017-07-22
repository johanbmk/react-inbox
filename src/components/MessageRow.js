import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleStarred, toggleSelected } from '../actions'
import Label from './Label.js';
import '../index.css';


class MessageRow extends Component {

  starWasClicked = (event) => {
    event.preventDefault();
    this.props.toggleStarred(this.props.messageId);
  }

  messageCheckboxWasClicked = (event) => {      // TODO needs fixing.
    // event.preventDefault();
    this.props.toggleSelected(this.props.messageId);
  }

  render() {
    let message = this.props.messagesById[this.props.messageId];
    let readClass = message.read ? 'read' : 'unread';
    let selectedClass = message.selected ? 'selected' : '';
    let starClass = message.starred ? 'star fa fa-star' : 'star fa fa-star-o';

    let labels = message.labels.map((labelText) => {
      return <Label text={labelText} key={labelText} />
    });

    return (
      <div className={`row message ${readClass} ${selectedClass}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={this.props.messagesById[this.props.messageId].selected} onChange={this.messageCheckboxWasClicked} />
            </div>
            <div className="col-xs-2">
              <i className={starClass} onClick={this.starWasClicked}></i>
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
  toggleStarred,
  toggleSelected
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageRow)
