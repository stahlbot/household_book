import React from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Divider, makeStyles, TextField} from "@material-ui/core";
import {Form, useForm} from "../useForm";
import Controls from "../controls/Controls";
import Grid from "@material-ui/core/Grid";
import {format} from "date-fns";

const initialFValues = {
  amount: "",
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


  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving")
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
    fetch("/api/bookings", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // props.onSaveNew(data)
        props.onSave(data)
        resetForm()
      });
  }

  return (

    <Card className={classes.root}>
      <Form onSubmit={handleSave}>

        <CardHeader title={"New Booking"}/>
        <Divider/>
        <CardContent>
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
                label="Credit"
                value={values.offsettingAccount}
                onChange={handleInputChange}
                options={props.accounts}
                optiontext={"name"}
                optiongroup={"get_account_type_display"}
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
                label="Debit"
                value={values.account}
                onChange={handleInputChange}
                options={props.accounts}
                optiontext={"name"}
                optiongroup={"get_account_type_display"}

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


          {/*<form onSubmit={test}>*/}
          {/*    <TextField id="outlined-basic" label="Test" variant="outlined" />*/}
          {/*    <Button variant="outlined" type={"submit"}>Outlined</Button>*/}
          {/*</form>*/}

        </CardContent>
        <Divider/>
        <CardActions>
          <Grid container justifyContent={"flex-end"}>
            <Grid item xs={1}>
              <Button variant={"contained"} color={"primary"} size={"large"} fullWidth
                      type={"submit"}>
                Save
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Form>


    </Card>


  );
}