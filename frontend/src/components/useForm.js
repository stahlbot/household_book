import React, {useEffect, useState} from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            // width: '40%',
            // margin: theme.spacing(1)
        },
        '& .MuiSelect-root': {
            // width: '400%',
            // margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    console.log(props);
    const { onSubmit, children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" onSubmit={onSubmit} {...other}>
            {props.children}
        </form>
    )
}