import React, {useEffect, useState} from "react";
import {FormControl, FormHelperText, Input, InputLabel, makeStyles, OutlinedInput} from "@material-ui/core";
import {Form, useForm} from "../useForm";
import Controls from "../controls/Controls";
import Grid from "@material-ui/core/Grid";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const initialFValues = {
    amount: undefined,
    offsettingAccount: "",
    date: new Date(),
    account: "",
    text: "",
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    height: 140,
    width: 100,
  },

}));


export default function BookingForm() {
    const classes = useStyles();

    const [accounts, setAccounts] = useState()
    const [isLoading, setLoading] = useState(true);

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues);

    useEffect(() => {
        console.log("lol")
        fetch("api/get-accounts")
            .then((response) => response.json())
            .then((data) => {
                setAccounts(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Form>
            <Grid container spacing={1} justifyContent="flex-start" className={classes.root}>
                <Grid item xs={1}>
                    <Controls.Input
                        name="amount"
                        label="Amount"
                        value={values.amount}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controls.Select
                        name="offsettingAccount"
                        label="Offsetting Account"
                        value={values.offsettingAccount}
                        onChange={handleInputChange}
                        options={accounts}
                        optiontext={"name"}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controls.DatePicker
                        name="date"
                        label="Date"
                        value={values.date}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controls.Select
                        name="account"
                        label="Account"
                        value={values.offsettingAccount}
                        onChange={handleInputChange}
                        options={accounts}
                        optiontext={"name"}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Controls.Input
                        fullWidth
                        name="text"
                        label="Text"
                        value={values.text}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>

        </Form>

    );
}