import React, {useEffect, useState} from "react";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";
import {Grid} from "@material-ui/core";
import BookingDialog from "./BookingDialog";

export default function Bookings() {
    const [bookings, setBookings] = useState({arrayvar: [{
        "amount":0,
        "offsetting_account":{
            "id":0,
            "name":"",
            "created_at":"",
            "account_type":"",
            "get_account_type_display":""},
        "date":"",
        "account":{
            "id":0,
            "name":"Bank",
            "created_at":"",
            "account_type":"",
            "get_account_type_display":""},
        "text":"",
        "created_at":""}]});

    const [dialogState, setDialogState] = useState({
        open: false,
        booking: {},
    })

    useEffect(() => {
        const requestOptions = {
                method: "GET",
            };
        fetch("api/bookings", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setBookings({arrayvar: data});
            });
    }, []);

    const onSave = (booking) => {
        setBookings({
            arrayvar: [booking, ...bookings.arrayvar]
        })
    }

    const handleTableRowClick = (booking) => {
        setDialogState({
            open: true,
            booking: booking,
        })
    }

    const handleDialogClose = () => {
        setDialogState({
            open: false,
            booking: {},
        })
    }

    return (
        <React.Fragment>
            <BookingDialog dialogState={dialogState} handleDialogClose={handleDialogClose}/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <BookingForm bookings={bookings} onSave={onSave}/>
                </Grid>
                <Grid item xs={12}>
                    <BookingList bookings={bookings.arrayvar} handleTableRowClick={handleTableRowClick}/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}