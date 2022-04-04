import React, {useEffect, useState} from "react";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";
import {Card, CardContent, CardHeader, Divider, Grid, Table, TableBody} from "@material-ui/core";
import BookingDialog from "./BookingDialog";
import AbstractTable from "../useTable";
import {Link} from "react-router-dom";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);

    const [accounts, setAccounts] = useState([])
    const [isLoading, setLoading] = useState(true);

    const getAccountName = ((id) => {
        let results = accounts.filter((acc) => acc.id === id)
        let first = results[0]
        if (first) {
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
                    <Card>
                        <CardHeader title={"Bookings"}/>
                        <Divider/>
                        <CardContent>
                            <AbstractTable
                                items={bookings}
                                restEndpointName={"bookings"}
                                headBodyMap={
                                    {
                                        ID: (item) => item.id,
                                        Name: (item) => item.text,
                                        Vorgang: (item) =>
                                            <div>
                                                {parseFloat(item.amount).toFixed(2)}€ <br/>
                                                <Link
                                                    to={'/account/' + item.offsetting_account}>{getAccountName(item.offsetting_account)}</Link>
                                                → <Link
                                                to={'/account/' + item.account}>{getAccountName(item.account)}</Link>
                                            </div>,
                                        Date: (item) => item.date,
                                    }
                                }
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}