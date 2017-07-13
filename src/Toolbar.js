import React, { Component } from 'react';
import './index.css';

class Toolbar extends Component {
  render() {
    let messageCount = this.props.messages.filter((msg) => !msg.read).length;

    return (
      <div className="Toolbar">

        <div className="row toolbar">
        <div className="col-md-12 text-left">
        <p className="pull-right">
        <span className="badge badge">{messageCount}</span>
        unread messages
        </p>

        <button className="btn btn-default">
        <i className="fa fa-square-o" onClick={() => this.props.selectAllMessages()}></i>
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
