import React from 'react';
import Nav from "./Nav";
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import Accounts from "./Accounts";
import Overview from "./Overview";
import Settings from "./Settings";
import Calender from "./Calender";


export default function HomePage(){
    return(
        <BrowserRouter>
            <Nav>
                <Switch>
                    <Route exact path="/" component={Overview}/>
                    <Route exact path="/accounts" component={Accounts}/>
                    <Route exact path="/calender" component={Calender}/>
                    <Route exact path="/settings" component={Settings}/>
                </Switch>
            </Nav>
        </BrowserRouter>
    );
}