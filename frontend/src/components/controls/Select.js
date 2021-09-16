import React, {useEffect} from 'react'
import {FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, makeStyles} from '@material-ui/core';


export default function Select(props) {

    const { name, label, value, onChange, options, optiontext, ...other } = props;


    useEffect(() =>{
        console.log(options)
        console.log(optiontext)
    },[])

    return (
        <FormControl variant="outlined" fullWidth={true}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                {...other}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item[optiontext]}</MenuItem>)
                    )
                }
            </MuiSelect>
        </FormControl>
    )
}