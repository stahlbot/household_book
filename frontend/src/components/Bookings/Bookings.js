import React, {useEffect, useState} from "react";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";
import {Grid} from "@material-ui/core";
import BookingDialog from "./BookingDialog";

export default function Bookings() {
    const [bookings, setBookings] = useState({
        arrayvar: [{
            "amount": 0,
            "offsetting_account": "",
            "date": "",
            "account": "",
            "text": "",
            "created_at": ""
        }]
    });

    const [dialogState, setDialogState] = useState({
        open: false,
    })
    const [bookingInDialog, setBookingInDialog] = useState({
        amount: 0,
        offsetting_account: "",
        date: "",
        account: "",
        text: "",
        created_at: ""
    })

    const [accounts, setAccounts] = useState([])
    const [isLoading, setLoading] = useState(true);

    const getAccountName = ((id) => {
        let results = accounts.filter((acc) => acc.id === id)
        let first = results[0]
        if (first !== undefined){
            return first.name
        }
        return "Not Found"
    })



    useEffect(() => {
        fetch("api/get-accounts")
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
        })
        setBookingInDialog(booking)
    }

    const handleDialogClose = () => {
        setDialogState({
            open: false,
            booking: {},
        })
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <BookingDialog dialogState={dialogState}  setDialogState={setDialogState} handleDialogClose={handleDialogClose} accounts={accounts}
                           booking={bookingInDialog} setBooking={setBookingInDialog} getAccountName={getAccountName}/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <BookingForm bookings={bookings} onSave={onSave} accounts={accounts}/>
                </Grid>
                <Grid item xs={12}>
                    <BookingList bookings={bookings.arrayvar} handleTableRowClick={handleTableRowClick} getAccountName={getAccountName}/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}