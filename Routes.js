import React, { Component } from "react";
import { BrowserRouter, Switch, Route ,history} from "react-router-dom";

import Screen1 from './Containers/Screen1';
import Screen2 from './Containers/Screen2';


export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter history={history}>
                <Switch>
                    <Route path="/" exact component={Screen1} />
                    <Route path="/Screen2" component={Screen2} />
                </Switch>
            </BrowserRouter>
        )
    }
}