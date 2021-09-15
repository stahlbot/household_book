import React, {useEffect, useState} from "react";
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
import NewAccountDialog from "./NewAccountDialog";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function AccountsList(props) {
    const classes = useStyles();

    const [state, setState] = useState({accounts: []});

    // get all accounts when the page is rendered
    useEffect(() => {
        fetch("api/get-accounts")
            .then((response) => response.json())
            .then((data) => {
                setState({accounts: data, am: data.length})
            });
    }, []);

    // renders a entry in the table for a given account. also sends the DELETE-Request when the entry is deleted
    const showAccount = (account) => {
        function handleDelete() {
            console.log("delete it")
            const requestOptions = {
            method: "DELETE",
        };
            return fetch("/api/account/" + account.id, requestOptions)
                .then((response) => {
                    // when deletion worked, remove the account from the state
                    if (response.ok){
                        const array = [...state.accounts];
                        const index = array.indexOf(account);
                        if (index !== 1){
                            array.splice(index, 1)
                            setState({accounts: array})
                        }
                    }
                })
        }

        return (
            <TableRow>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.get_account_type_display}</TableCell>
                <TableCell>{account.created_at}</TableCell>
                <TableCell>
                    <IconButton>
                        <DeleteOutlineOutlinedIcon style={{color: "red"}} onClick={handleDelete}/>
                    </IconButton>
                </TableCell>
            </TableRow>
        )

    }

    // State for the new Account form dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveNewAccount = (acc) => {
        let accounts = state.accounts
        accounts.push(acc)
        setState({accounts: accounts})
        setOpen(false);
    }


    return (
        <Paper>
            <Toolbar >
                <Button aria-label="add" color={"primary"} variant={"outlined"} startIcon={<AddIcon/>} onClick={handleClickOpen}>
                    New
                </Button>
                <NewAccountDialog handleClose={handleClose} open={open} onSave={saveNewAccount}/>
            </Toolbar>
            <TableContainer>
                <Table className={classes.table} aria-label={"accounts"}>

                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.accounts.map(showAccount)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}