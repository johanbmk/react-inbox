import React from 'react';
import './App.css';
import Toolbar from './components/Toolbar.js';
import ComposeForm from './components/ComposeForm.js';
import MessageTable from './components/MessageTable.js';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <div className="App">
      <div className="container">
        <Route path="/" component={Toolbar} />
        <Route path="/compose" component={ComposeForm} />
        <MessageTable />
      </div>
    </div>
  </Router>
)

export default App;
