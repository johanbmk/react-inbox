import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../index.css';
import {
  selectAllMessages,
  setReadForSelected,
  setLabelForSelected,
  deleteSelected
} from '../actions';
import { Link } from 'react-router-dom';


class Toolbar extends Component {

  labelSelectorWasChanged = (event, value) => {
    let selection = event.target.value;
    if (!['Apply label', 'Remove label'].includes(selection)) {
      this.props.setLabelForSelected(selection, value)
    }
  }

  render() {
    let totalMessagesCount = this.props.messageIds.length;
    let selectedMessageIds = [];
    let unreadMessagesCount = 0;
    for (let id of this.props.messageIds) {
      let message = this.props.messagesById[id];
      if (!message.read) { unreadMessagesCount += 1 };
      if (message.selected) { selectedMessageIds.push(id) };
    }

    // Set 'select all' button appearance depending on selected messages count
    let selectAllButtonClass;
    if (selectedMessageIds.length === 0) {
      selectAllButtonClass = 'fa fa-square-o'; // no message selected
    }
    else if (selectedMessageIds.length === totalMessagesCount) {
      selectAllButtonClass = 'fa fa-check-square-o'; // all messages selected
    }
    else {
      selectAllButtonClass = 'fa fa-minus-square-o'; // some messages selected
    }

    // console.log(this.props);
    let composeLink = this.props.location.pathname === '/compose' ? '/' : '/compose';

    return (
      <div className="Toolbar">

        <div className="row toolbar">
        <div className="col-md-12 text-left">
        <p className="pull-right">
        <span className="badge badge">{unreadMessagesCount}</span>
        unread messages
        </p>

        <Link to={composeLink} className="btn btn-danger"><i className="fa fa-plus"></i></Link>

        <button className="btn btn-default">
        <i className={selectAllButtonClass} onClick={this.props.selectAllMessages}></i>
        </button>

        <button className="btn btn-default" disabled={selectedMessageIds.length === 0}
        onClick={() => this.props.setReadForSelected(true)}>
        Mark As Read
        </button>

        <button className="btn btn-default" disabled={selectedMessageIds.length === 0}
        onClick={() => this.props.setReadForSelected(false)}>
        Mark As Unread
        </button>

        <select value="Apply label" className="form-control label-select" disabled={selectedMessageIds.length === 0}
        onChange={(event) => this.labelSelectorWasChanged(event, true)}>
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
        </select>

        <select value="Remove label" className="form-control label-select" disabled={selectedMessageIds.length === 0}
        onChange={(event) => this.labelSelectorWasChanged(event, false)}>
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled={selectedMessageIds.length === 0}
        onClick={this.props.deleteSelected}>
        <i className="fa fa-trash-o"></i>
        </button>
        </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    messageIds: state.messages.ids,
    messagesById: state.messages.byId
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  selectAllMessages,
  setReadForSelected,
  setLabelForSelected,
  deleteSelected
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
