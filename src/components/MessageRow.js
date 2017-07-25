import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../index.css';
import { toggleStarred, toggleSelected } from '../actions'
import Label from './Label.js';
import MessageViewer from './MessageViewer.js';
import { Route, Link } from 'react-router-dom';


class MessageRow extends Component {

  starWasClicked = (event) => {
    // event.preventDefault();  // seems to make no diffrence here.
    this.props.toggleStarred(this.props.messageId);
  }

  messageCheckboxWasClicked = (event) => {
    // event.preventDefault(); // Having this enabled made checkmark and highlight (css) go out of sync.
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
        <div>
          <div className={`row message ${readClass} ${selectedClass}`}>
            <div className="col-xs-1">
              <div className="row">
                <div className="col-xs-2">
                  <input type="checkbox" checked={message.selected}
                    onChange={this.messageCheckboxWasClicked} />
                  </div>
                  <div className="col-xs-2">
                    <i className={starClass} onClick={this.starWasClicked}></i>
                  </div>
                </div>
              </div>
              <div className="col-xs-11 text-left">
                {labels}
                <Link to={`/messages/${this.props.messageId}`}>{message.subject}</Link>
              </div>
            </div>
            <Route path={`/messages/${this.props.messageId}`} component={() => (<MessageViewer id={this.props.messageId} />)}/>
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
