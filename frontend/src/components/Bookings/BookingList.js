import React, {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import PropTypes from 'prop-types';
import BookingDialog from "./BookingDialog";


function BookingList(props) {
    const [dialogState, setDialogState] = useState({
        open: false,
    })
    const [bookingInDialog, setBookingInDialog] = useState({})

    const handleDialogClose = () => {
        setDialogState({
            open: false,
        })
        setBookingInDialog({});
    }

    const handleTableRowClick = (booking) => {
        setDialogState({
            open: true,
        })
        setBookingInDialog(booking)
    }

    const handleDialogSave = () => {
        props.setBookings(props.bookings.map((booking) => {
            if (booking.id === bookingInDialog.id) {
                return bookingInDialog
            }
            return booking
        }))
        handleDialogClose()
    }


    const showBooking = (booking) => {
        return (
            <TableRow onClick={() => handleTableRowClick(booking)} hover>
                <TableCell>{booking.amount}</TableCell>
                <TableCell>{props.getAccountName(booking.offsetting_account)}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{props.getAccountName(booking.account)}</TableCell>
                <TableCell>{booking.text}</TableCell>
            </TableRow>
        );
    }

    // for displaying the newest bookings first
    const compare = (a, b) => {
        if (a.created_at < b.created_at) {
            return 1;
        }
        if (a.created_at > b.created_at) {
            return -1;
        }
        return 0;
    }

    return (
        <React.Fragment>
            {dialogState.open && <BookingDialog dialogState={dialogState} setDialogState={setDialogState}
                            handleDialogClose={handleDialogClose} accounts={props.accounts}
                            booking={bookingInDialog} setBooking={setBookingInDialog}
                            getAccountName={props.getAccountName} handleDialogSave={handleDialogSave}/>}
            <Card>
                <CardHeader title={"Bookings"}/>
                <Divider/>
                <CardContent>
                    <Table>
                        <TableBody>
                            {props.bookings.sort(compare).map(showBooking)}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

BookingList.propTypes = {
    bookings: PropTypes.arrayOf(PropTypes.exact({
        amount: PropTypes.number,
        offsetting_account: PropTypes.string,
        date: PropTypes.string,
        account: PropTypes.string,
        text: PropTypes.string,
        created_at: PropTypes.string
    }))
}

export default BookingList