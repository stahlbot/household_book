import React from 'react';
import Nav from "./Nav";
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import Accounts from "./Accounts/Accounts";
import Overview from "./Overview";
import Settings from "./Settings";
import Bookings from "./Bookings/Bookings";
import Account from "./Accounts/Account";


export default function HomePage(){
    return(
        <BrowserRouter>
            <Nav>
                <Switch>
                    <Route exact path="/" component={Overview}/>
                    <Route exact path="/accounts" component={Accounts}/>
                    <Route path="/account/:id"
                           render={
                               (props) => {
                                   return <Account {...props} />
                               }
                           }
                    />
                    <Route exact path="/bookings" component={Bookings}/>
                    <Route exact path="/settings" component={Settings}/>
                </Switch>
            </Nav>
        </BrowserRouter>
    );
}