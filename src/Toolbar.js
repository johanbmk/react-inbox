import React, { Component } from 'react';
import './index.css';

class Toolbar extends Component {
  render() {
    // let unreadMessagesCount = this.props.messages.filter((msg) => !msg.read).length;
    // let selectedMessagesCount = this.props.messages.filter((msg) => msg.selected).length;
    let totalMessagesCount = this.props.messages.length;
    let unreadMessagesCount = 0;
    let selectedMessagesCount = 0;
    for (let msg of this.props.messages) {
      if (!msg.read) {unreadMessagesCount += 1};
      if (msg.selected) {selectedMessagesCount += 1};
    }

    // Set 'select all' button appearance depending on selected messages count
    let selectAllButtonClass = 'fa fa-square-o';
    if (selectedMessagesCount === 0) {
      selectAllButtonClass = 'fa fa-square-o';
    } else if (selectedMessagesCount === totalMessagesCount) {
      selectAllButtonClass = 'fa fa-check-square-o'; // all messages selected
    } else if (selectedMessagesCount > 0) {
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

        <button className="btn btn-default">
        <i className={selectAllButtonClass} onClick={this.props.selectAllMessages}></i>
        </button>

        <button className="btn btn-default" disabled="disabled">
        Mark As Read
        </button>

        <button className="btn btn-default" disabled="disabled">
        Mark As Unread
        </button>

        <select className="form-control label-select" disabled="disabled">
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled="disabled">
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled="disabled">
        <i className="fa fa-trash-o"></i>
        </button>
        </div>
        </div>

      </div>
    )
  }
}

export default Toolbar;
