import React, { Component } from 'react';
import './index.css';
import Label from './Label.js';

class MessageRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      read: this.props.message.read,
      starred: this.props.message.starred,
      selected: false,
    };
  }

  // toggleSelected() {
  //   let selected = !this.state.selected;
  //   this.setState({selected});
  // }

  toggleStarred() {
    let starred = !this.state.starred;
    this.setState({starred});
  }

  render() {
    const readClass = this.state.read ? 'read' : 'unread';
    const selectedClass = this.props.message.selected ? 'selected' : '';
    const starClass = this.state.starred ? 'star fa fa-star' : 'star fa fa-star-o';

    var labels = [];
    this.props.message.labels.forEach((labelText) => {
      labels.push(<Label text={labelText} key={labelText} />);
    });

    return (
      <div className={`row message ${readClass} ${selectedClass}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" onClick={() => this.props.toggleMessageSelected(this.props.message.id)}/>
            </div>
            <div className="col-xs-2">
              <i className={starClass} onClick={() => this.toggleStarred()}></i>
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
