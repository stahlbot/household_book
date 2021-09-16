import React from "react";
import BookingForm from "./Bookings/BookingForm";
import {Paper} from "@material-ui/core";

export default function Calender(){
    return (
        <React.Fragment>
            <h1>Calender</h1>
            <Paper>
                <BookingForm/>
            </Paper>
        </React.Fragment>
    )
}