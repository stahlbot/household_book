import React from "react";
import {TextField, Typography, withStyles} from "@material-ui/core";

export default function BalanceDisplay({account}){

    const getColor = () => {

        if (account.account_type === 'EX' || account.account_type === 'RE'){
            if (account.balance >= 0){
                return 'red'
            } else {
                return 'green'
            }
        }
        if (account.balance >= 0) {
            return "green"
        } else {
            return "red"
        }
    }



    return (
        <Typography variant={"body1"} style={{color: getColor(), display: "inline"}}>
            {Math.abs(account.balance).toFixed(2)}€
        </Typography>
    );
}