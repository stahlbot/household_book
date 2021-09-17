import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Controls from "../controls/Controls";
import {Form, useForm} from "../useForm";

export default function BookingDialog(props) {

    const handleSave = () => {
        const requestOptions = {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    amount: props.booking.amount,
                    offsetting_account: props.booking.offsetting_account.id,
                    date: props.booking.date,
                    account: props.booking.account.id,
                    text: props.booking.text,
                }),
            };
            fetch("/api/booking/" + props.booking.id, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    props.setDialog({
                        open: false
                    })
                    props.updateList()
                });
    }

    const handleInputChange = (event) => {
        props.setBooking({
            ...props.booking,
            [event.target.name]: event.target.value,
        });
        console.log(props.booking)
    }

    const getAccountName = ((id) => {
        let results = props.accounts.filter((acc) => acc.id === id)
        let first = results[0]
        if (first !== undefined){
            console.log(first.name)
            return first.name
        }
        return "Not Found"
    })

    return (
        <Dialog open={props.dialogState.open} onClose={props.handleDialogClose} maxWidth={"sm"}>
            <DialogTitle>Edit/Delete Booking for {getAccountName(props.booking.account.id)}</DialogTitle>
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
                                    value={props.booking.account.id}
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
        </Dialog>
    );
}