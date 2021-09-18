import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Controls from "../controls/Controls";
import {Form, useForm} from "../useForm";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import {format, parse} from "date-fns";

export default function BookingDialog(props) {

    // useEffect(() => {
    //     console.log(parse(props.booking.date, 'yyyy-MM-dd', new Date()))
    //     props.setBooking({
    //         ...props.booking,
    //         date: parse(props.booking.date, 'yyyy-MM-dd', new Date())
    //     })
    // }, [])


    const handleSave = () => {
        const requestOptions = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                amount: props.booking.amount,
                offsetting_account: props.booking.offsetting_account,
                date: props.booking.date,
                account: props.booking.account,
                text: props.booking.text,
            }),
        };
        console.log(props.booking)

        fetch("/api/booking/" + props.booking.id, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                console.log("handlesave")
                props.handleDialogSave()
            });
    }

    const handleInputChange = (event) => {
        let value = event.target.value
        props.setBooking({
            ...props.booking,
            [event.target.name]: value instanceof Date ? format(value, 'yyyy-MM-dd') : value,
        });
    }

    return (
        <Dialog open={props.dialogState.open} onClose={props.handleDialogClose} maxWidth={"sm"}>
            <DialogTitle>Edit/Delete Booking}</DialogTitle>
            <DialogContent>
                <Form>
                    <Grid container spacing={1} justifyContent="flex-start"
                              alignItems={"center"}>
                            <Grid item xs={6}>
                                <Controls.Input
                                    fullWidth
                                    name="amount"
                                    label="Amount"
                                    value={props.booking.amount}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Controls.Select
                                    name="offsetting_account"
                                    label="Offsetting Account"
                                    value={props.booking.offsetting_account}
                                    onChange={handleInputChange}
                                    options={props.accounts}
                                    optiontext={"name"}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Controls.DatePicker
                                    name="date"
                                    label="Date"
                                    value={props.booking.date}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Controls.Select
                                    name="account"
                                    label="Account"
                                    value={props.booking.account}
                                    onChange={handleInputChange}
                                    options={props.accounts}
                                    optiontext={"name"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controls.Input
                                    fullWidth
                                    name="text"
                                    label="Text"
                                    value={props.booking.text}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                    </Form>
            </DialogContent>
            <DialogActions>
                    <Button onClick={props.handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
            </DialogActions>
        </Dialog>
    );
}