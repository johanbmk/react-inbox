import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar.js';
import ComposeForm from './components/ComposeForm.js';
import MessageTable from './components/MessageTable.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Toolbar />
          <ComposeForm />
          <MessageTable />
        </div>
      </div>
    )
  }
}

export default App;
