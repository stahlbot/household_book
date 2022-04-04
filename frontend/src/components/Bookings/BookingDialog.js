import React from "react";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Controls from "../controls/Controls";
import {Form} from "../useForm";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import {format} from "date-fns";

export default function BookingDialog(props) {

    const handleSave = () => {
        const requestOptions = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                amount: props.bookingInDialog.amount,
                offsetting_account: props.bookingInDialog.offsetting_account,
                date: props.bookingInDialog.date,
                account: props.bookingInDialog.account,
                text: props.bookingInDialog.text,
            }),
        };
        console.log(props.bookingInDialog)

        fetch("/api/bookings/" + props.bookingInDialog.id, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                props.handleDialogSave()
            });
    }

    const handleInputChange = (event) => {
        let value = event.target.value
        props.setBookingInDialog({
            ...props.bookingInDialog,
            [event.target.name]: value instanceof Date ? format(value, 'yyyy-MM-dd') : value,
        });
    }

    // for deleting an entry
    function handleDelete() {
        console.log("delete it")
        const requestOptions = {
            method: "DELETE",
        };
        return fetch("/api/bookings/" + props.bookingInDialog.id, requestOptions)
            .then((response) => {
                // when deletion worked, remove the account from the state
                if (response.ok) {
                    const array = [...props.bookings];
                    const index = array.indexOf(props.bookingInDialog);
                    if (index !== 1) {
                        array.splice(index, 1)
                        props.setBookings(array)
                    }
                    props.handleDialogClose()
                }
            })
    }

    return (
        <Dialog open={props.dialogState.open} onClose={props.handleDialogClose} maxWidth={"sm"}>
            <DialogTitle>Edit/Delete Booking</DialogTitle>
            <DialogContent>
                <Form>
                    <Grid container spacing={1} justifyContent="flex-start"
                          alignItems={"center"}>
                        <Grid item xs={6}>
                            <Controls.Input
                                fullWidth
                                name="amount"
                                label="Amount"
                                value={props.bookingInDialog.amount}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controls.Select
                                name="offsetting_account"
                                label="Offsetting Account"
                                value={props.bookingInDialog.offsetting_account}
                                onChange={handleInputChange}
                                options={props.accounts}
                                optiontext={"name"}
                                optiongroup={"get_account_type_display"}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controls.DatePicker
                                name="date"
                                label="Date"
                                value={props.bookingInDialog.date}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controls.Select
                                name="account"
                                label="Account"
                                value={props.bookingInDialog.account}
                                onChange={handleInputChange}
                                options={props.accounts}
                                optiontext={"name"}
                                optiongroup={"get_account_type_display"}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controls.Input
                                fullWidth
                                name="text"
                                label="Text"
                                value={props.bookingInDialog.text}
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
                <Button onClick={handleDelete} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}