import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function NewAccountDialog(props) {
    const classes = useStyles();

    const handleSave = () => {
        console.log(props.dialog.edit)
        if (props.dialog.edit) {
            const requestOptions = {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: props.account.name,
                    account_type: props.account.account_type
                }),
            };
            fetch("/api/accounts/" + props.account.id, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    props.setDialog({
                        open: false
                    })
                    props.updateList()
                });

        } else {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: props.account.name,
                    account_type: props.account.account_type
                }),
            };
            fetch("/api/accounts", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    props.onSaveNew(data)
                });

        }

    };

    const updateInput = (event) => {
        props.setAccount({
            ...props.account,
            [event.target.name]: event.target.value,
        });
        console.log(props.account)
    }

    return (
        <React.Fragment>
            <Dialog open={props.dialog.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.dialog.edit ? "Edit Account" : "Add a new Account"}</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        required={true}
                        onChange={updateInput}
                        name={"name"}
                        value={props.account.name}
                        fullWidth
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={props.account.account_type}
                            onChange={updateInput}
                            name={"account_type"}
                        >
                            <MenuItem value={"AS"}>Asset</MenuItem>
                            <MenuItem value={"LI"}>Liability</MenuItem>
                            <MenuItem value={"RE"}>Revenue</MenuItem>
                            <MenuItem value={"EX"}>Expense</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} type={"submit"} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}