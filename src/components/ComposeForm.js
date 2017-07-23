import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../index.css';
import { sendMessage, toggleComposeMode } from '../actions';

class ComposeForm extends Component {

  submitWasClicked = (event) => {
    event.preventDefault();
    this.props.sendMessage(event.target.subject.value, event.target.body.value)
    this.props.toggleComposeMode()
  }

  render() {
    if (this.props.composeMode) {
      return (
        <form className="form-horizontal well" onSubmit={this.submitWasClicked}>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea name="body" id="body" className="form-control"></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input type="submit" value="Send" className="btn btn-primary" />
            </div>
          </div>
        </form>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    composeMode: state.app.composeMode
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  sendMessage,
  toggleComposeMode
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposeForm)
