import React from 'react';
import Nav from "./Nav";
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import Accounts from "./Accounts";
import Overview from "./Overview";


export default function HomePage(){
    return(
        <BrowserRouter>
            <Nav>
                <Switch>
                    <Route exact path="/" component={Overview}/>
                    <Route exact path="/accounts" component={Accounts}/>
                </Switch>
            </Nav>
        </BrowserRouter>
    );
}