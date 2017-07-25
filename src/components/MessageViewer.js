import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../index.css';
import { fetchMessage } from '../actions'


class MessageViewer extends Component {
  componentDidMount() {
    this.props.fetchMessage(this.props.id);
  }

  render() {
    if (!this.props.messageBody) {
      return (
        <div className="row message-body">
          <div className="col-xs-11 col-xs-offset-1">
            Loading...
          </div>
        </div>
      )
    } else {
      return (
        <div className="row message-body">
          <div className="col-xs-11 col-xs-offset-1">
            {this.props.messageBody}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    messageBody: state.viewedMessage.body
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMessage: fetchMessage
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageViewer)
