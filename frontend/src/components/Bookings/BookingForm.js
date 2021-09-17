import React, {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Divider, makeStyles} from "@material-ui/core";
import {Form, useForm} from "../useForm";
import Controls from "../controls/Controls";
import Grid from "@material-ui/core/Grid";
import {format} from "date-fns";

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
        padding: theme.spacing(0),
    },
    paper: {
        height: 140,
        width: 100,
    },

}));


export default function BookingForm(props) {
    const classes = useStyles();



    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues);





    const handleSave = () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                amount: values.amount,
                offsetting_account: values.offsettingAccount,
                date: format(values.date, 'yyyy-MM-dd'),
                account: values.account,
                text: values.text,
            }),
        };
        fetch("/api/create-booking", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                // props.onSaveNew(data)
                console.log(data)
                props.onSave(data)
            });
    }

    return (

        <Card className={classes.root}>
            <CardHeader title={"New Booking"}/>
            <Divider/>
            <CardContent>
                <Form>
                    <Grid container spacing={1} justifyContent="flex-start"
                          alignItems={"center"}>
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
                                options={props.accounts}
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
                                value={values.account}
                                onChange={handleInputChange}
                                options={props.accounts}
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

            </CardContent>
            <Divider/>
            <CardActions>
                <Grid container justifyContent={"flex-end"}>
                    <Grid item xs={1}>
                        <Button variant={"contained"} color={"primary"} size={"large"} fullWidth
                                onClick={handleSave}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>

        </Card>


    );
}