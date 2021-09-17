import React from "react";
import {Dialog, DialogTitle} from "@material-ui/core";

export default function BookingDialog(props) {

    return (
        <Dialog open={props.dialogState.open} onClose={props.handleDialogClose}>
            <DialogTitle>{props.dialogState.booking.text}</DialogTitle>
        </Dialog>
    );
}