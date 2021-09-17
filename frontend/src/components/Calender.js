import React from "react";
import BookingForm from "./Bookings/BookingForm";
import BookingList from "./Bookings/BookingList";
import {Grid} from "@material-ui/core";

export default function Calender() {
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <BookingForm/>
                </Grid>
                <Grid item xs={12}>
                    <BookingList/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}