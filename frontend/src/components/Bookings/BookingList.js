import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

export default function BookingList() {

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
                console.log(data);
                console.log(JSON.stringify(data))
                setBookings(data);
            });
    }, []);

    const showBooking = (booking) => {
        console.log(booking.account.name)
        return (
            <TableRow>
                <TableCell>{booking.amount}</TableCell>
                <TableCell>{booking.offsetting_account.name}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.account.name}</TableCell>
                <TableCell>{booking.text}</TableCell>
            </TableRow>
        );
    }

    return(
        <React.Fragment>
            <Card>
                <CardHeader title={"Bookings"}/>
                <Divider/>
                <CardContent>
                    <Table>
                        <TableBody>
                            {bookings.map(showBooking)}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}