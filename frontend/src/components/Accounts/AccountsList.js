import React from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Tooltip, Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function AccountsList(props) {
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


    return (
        <Paper>
            <Toolbar >
                <Button aria-label="add" color={"primary"} variant={"outlined"} startIcon={<AddIcon/>}>
                    New
                </Button>
            </Toolbar>
            <TableContainer>
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
        </Paper>
    );
}