import React, {useEffect} from 'react'
import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
    FormHelperText,
    makeStyles,
    ListSubheader
} from '@material-ui/core';


export default function Select(props) {

    const { name, label, value, onChange, options, optiontext, optiongroup, ...other } = props;

    // Accepts the array and key
    const groupBy = (array, key) => {
      // Return the end result
      return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, {}); // empty object is the initial value for result object
    };


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
                    Object.entries(groupBy(options, optiongroup)).map(([key, val]) => {
                        return [<ListSubheader>{key}</ListSubheader>, val.map(item => (<MenuItem key={item.id} value={item.id}>{item[optiontext]}</MenuItem>))]
                    })
                }
            </MuiSelect>
        </FormControl>
    )
}