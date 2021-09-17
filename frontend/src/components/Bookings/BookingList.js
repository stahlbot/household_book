import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

export default function BookingList(props) {

    const showBooking = (booking) => {
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

    // for displaying the newest bookings first
    const compare = ( a, b ) => {
      if ( a.created_at < b.created_at ){
        return 1;
      }
      if ( a.created_at > b.created_at ){
        return -1;
      }
      return 0;
    }

    return(
        <React.Fragment>
            <Card>
                <CardHeader title={"Bookings"}/>
                <Divider/>
                <CardContent>
                    <Table>
                        <TableBody>
                            {props.bookings.arrayvar.sort(compare).map(showBooking)}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}