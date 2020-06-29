import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from '../../Components/Button';
import {withRouter} from 'react-router-dom'
import Screen2 from '../Screen2';
import './style.css';
import history from '../../history';

class Screen1 extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  handleButtonClick = () =>{
    this.props.history.push('/Screen2');
  }

  render() {
    return (
      <div className="d-flex h-100vh justify-content-center">
        <div className="align-self-center">
          <Button handleButtonClick={this.handleButtonClick} title="Register"/>
        </div>
      </div>
    );
  }
}
export default Screen1;