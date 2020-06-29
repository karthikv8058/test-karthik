import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { hot } from 'react-hot-loader/root';

import Routes from './Routes';


function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default hot(App);