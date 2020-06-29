import React, { Component } from "react";
import { BrowserRouter as Router,  Switch, Route } from "react-router-dom";

import Screen1 from './Containers/Screen1';
import Screen2 from './Containers/Screen2';
import Screen3 from './Containers/Screen3';
//import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                 <Switch>
                    <Route path="/" exact component={Screen1} />
                    <Route path="/Screen2" component={Screen2} />
                    <Route path="/Screen3" component={Screen3} />
                </Switch>
            </Router>
               
        )
    }
}