import React, { Component } from 'react';
import './index.css';

class Toolbar extends Component {
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

    return (
      <div className="Toolbar">

        <div className="row toolbar">
        <div className="col-md-12 text-left">
        <p className="pull-right">
        <span className="badge badge">{unreadMessagesCount}</span>
        unread messages
        </p>

        <a className="btn btn-danger" onClick={this.props.toggleComposeMode}><i className="fa fa-plus"></i></a>

        <button className="btn btn-default">
        <i className={selectAllButtonClass} onClick={() => this.props.selectAllMessages(selectedMessageIds)}></i>
        </button>

        <button className="btn btn-default" disabled={selectedMessageIds.length === 0}
        onClick={() => this.props.setProperty(selectedMessageIds, 'read', true)}>
        Mark As Read
        </button>

        <button className="btn btn-default" disabled={selectedMessageIds.length === 0}
        onClick={() => this.props.setProperty(selectedMessageIds, 'read', false)}>
        Mark As Unread
        </button>

        <select className="form-control label-select" disabled={selectedMessageIds.length === 0}
        onChange={(event) => this.props.setProperty(selectedMessageIds, 'label', true, event.target.value)}>
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={selectedMessageIds.length === 0}
        onChange={(event) => this.props.setProperty(selectedMessageIds, 'label', false, event.target.value)}>
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled={selectedMessageIds.length === 0}
        onClick={() => this.props.setProperty(selectedMessageIds, 'delete')}>
        <i className="fa fa-trash-o"></i>
        </button>
        </div>
        </div>

      </div>
    )
  }
}

export default Toolbar;
