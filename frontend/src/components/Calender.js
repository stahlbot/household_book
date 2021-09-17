import React, {useEffect, useState} from "react";
import BookingForm from "./Bookings/BookingForm";
import BookingList from "./Bookings/BookingList";
import {Grid} from "@material-ui/core";

export default function Calender() {
    const [bookings, setBookings] = useState([{
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
        "text":""}]);

    useEffect(() => {
        const requestOptions = {
                method: "GET",
            };
        fetch("api/bookings", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setBookings(data);
                console.log(data[0].account.name)
            });
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <BookingForm bookings={bookings} setBookings={setBookings}/>
                </Grid>
                <Grid item xs={12}>
                    <BookingList bookings={bookings}/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}