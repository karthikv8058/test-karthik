import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

const Button = (props) =>{
  return(
    <div>
      <button onClick={props.handleButtonClick} className="btn-screen">{props.title}</button>
    </div>
  );
}

export default Button;