import React, { Component } from 'react';
import './App.css';

class Toolbar extends Component {
  render() {
    return (
      <div className="Toolbar">

        <div className="row toolbar">
        <div className="col-md-12">
        <p className="pull-right">
        <span className="badge badge">3</span>
        unread messages
        </p>

        <button className="btn btn-default">
        <i className="fa fa-square-o"></i>
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
    );
  }
}

export default Toolbar;
