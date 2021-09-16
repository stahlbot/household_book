import React from "react";
import {FormControl, FormHelperText, Input, InputLabel, OutlinedInput} from "@material-ui/core";
import {Form, useForm} from "../useForm";
import Controls from "../controls/Controls";

const initialFValues = {
    amount: 0,
    offsettingAccount: "",
    date: new Date(),
    account: "",
    text: "hure",
}

export default function BookingForm() {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues);

    return (
        <Form>
            <Controls.Input
                name="amount"
                label="Amount"
                value={values.amount}
                onChange={handleInputChange}
            />
            <Controls.Input
                name="text"
                label="Text"
                value={values.text}
                onChange={handleInputChange}
            />
        </Form>

    );
}