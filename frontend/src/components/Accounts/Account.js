import React, {useEffect, useState} from "react";
import {Grid, Paper, Typography} from "@material-ui/core";
import BookingForm from "../Bookings/BookingForm";
import BookingList from "../Bookings/BookingList";
import BalanceDisplay from "../BalanceDisplay";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

export default function Account(props) {
    const [account, setAccount] = useState({})
    const [bookings, setBookings] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0)


    const getAccountName = ((id) => {
        let results = accounts.filter((acc) => acc.id === id)
        let first = results[0]
        if (first){
            return first.name
        }
        return "Not Found"
    })

    const calculateBalance = () => {
        let bookingsThisAccount = bookings.filter((booking) => booking.account === account.id);
        let bookingsOffsettingAccount = bookings.filter((booking) => booking.account !== account.id);
        let bookingsThisAccountValue = bookingsThisAccount.map((booking) => booking.amount).reduce((a, b) => a + b, 0);
        let bookingsOffsettingAccountValue = bookingsOffsettingAccount.map((booking) => booking.amount).reduce((a, b) => a + b, 0);
        return bookingsThisAccountValue - bookingsOffsettingAccountValue;
    }

    useEffect(() => {
        fetch("../api/accounts")
            .then((response) => response.json())
            .then((data) => {

                setAccounts(data);
            });
    }, []);

    useEffect(() => {
        let id = props.match.params.id
        const requestOptions = {
            method: "GET",
        };
        fetch("../api/accounts/" + id)
            .then((response) => response.json())
            .then((data) => {
                setAccount(data);
                setBookings(data.bookings)
                setLoading(false);
            });
    },[])

    useEffect(() => {
        setBalance(calculateBalance());
    },[bookings])

    if (isLoading){
        return "loading"
    }

    return(
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <IconButton>
                        <EditOutlinedIcon color={"secondary"} onClick={() => console.log("edit not implemented")}/>
                   </IconButton>
                        <h1>{account.name}</h1>
                        Saldo: <BalanceDisplay account={account}/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <BookingList bookings={bookings} setBookings={setBookings} getAccountName={getAccountName} accounts={accounts}/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}