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
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function NewAccountDialog(props) {
    const classes = useStyles();

    const [input, setInput] = useState({
        Name: "Hi",
        Type: "AS"
    })

    const handleSave = () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: input.Name,
                account_type: input.Type
            }),
        };
        fetch("/api/create-account", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                props.onSave(data)
            });

    };

    const updateInput = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        });
        console.log(input)
    }

    return (
        <React.Fragment>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a new Account</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        required={true}
                        onChange={updateInput}
                        name={"Name"}
                        value={input.Name}
                        fullWidth
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={input.Type}
                            onChange={updateInput}
                            name={"Type"}
                        >
                            <MenuItem value={"AS"}>Asset</MenuItem>
                            <MenuItem value={"LI"}>Liability</MenuItem>
                            <MenuItem value={"EA"}>Earning</MenuItem>
                            <MenuItem value={"EX"}>Expense</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
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