import React, {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function AccountsList (props) {
    const classes = useStyles();

    const showAccount = (account) => {
        return (
            <TableRow>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.created_at}</TableCell>
            </TableRow>
            )

    }



    return(
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label={"accounts"}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.accounts.map(showAccount)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}