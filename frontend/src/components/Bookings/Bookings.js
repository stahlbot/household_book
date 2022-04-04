import React, {useEffect, useState} from "react";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";
import {Grid} from "@material-ui/core";
import BookingDialog from "./BookingDialog";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);

    const [accounts, setAccounts] = useState([])
    const [isLoading, setLoading] = useState(true);

    const getAccountName = ((id) => {
        let results = accounts.filter((acc) => acc.id === id)
        let first = results[0]
        if (first){
            return first.name
        }
        return "Not Found"
    })



    useEffect(() => {
        fetch("api/accounts")
            .then((response) => response.json())
            .then((data) => {
                setAccounts(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
        };
        fetch("api/bookings", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setBookings(data);
            });
    }, []);

    const onSave = (booking) => {
        setBookings(
            [booking, ...bookings]
        )
    }






    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <BookingForm bookings={bookings} onSave={onSave} accounts={accounts}/>
                </Grid>
                <Grid item xs={12}>
                    <BookingList bookings={bookings} setBookings={setBookings} getAccountName={getAccountName} accounts={accounts}/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}