import React, { Component } from 'react';
import './index.css';
import Label from './Label.js';

class MessageRow extends Component {
  constructor (props) {
    super(props);
    this.state = {
      read: this.props.message.read,
      starred: this.props.message.starred,
      selected: false,
      rowClasses: this.props.message.read ? ' read' : ' unread'
    };
  }

  toggleSelected() {
    let readClass = this.state.read ? ' read' : ' unread';
    let selectedClass;
    let selected;
    if (this.state.selected) {
      selectedClass = '';
      selected = false;
    } else {
      selectedClass = ' selected';
      selected = true;
    }
    let rowClasses = readClass + selectedClass;
    this.setState({selected, rowClasses});
  }

  toggleStar() {
    let starred = !this.state.starred;
    this.setState({starred});
  }

  render() {
    const starClass = this.state.starred ? 'star fa fa-star' : 'star fa fa-star-o';

    var labels = [];
    this.props.message.labels.forEach((labelText) => {
      labels.push(<Label text={labelText} key={labelText} />);
    });
    return (
      <div className={'row message' + this.state.rowClasses}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" onClick={() => this.toggleSelected()}/>
            </div>
            <div className="col-xs-2">
              <i className={starClass} onClick={() => this.toggleStar()}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11 text-left">
          {labels}
          <a href="index.html">{this.props.message.subject}</a>
        </div>
      </div>
    )
  }
}

export default MessageRow;
