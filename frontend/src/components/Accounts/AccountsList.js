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
    Toolbar
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import NewAccountDialog from "./NewAccountDialog";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {Link} from "react-router-dom";
import BalanceDisplay from "../BalanceDisplay";
import AbstractTable from "../useTable";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function AccountsList(props) {
    const classes = useStyles();

    const [state, setState] = useState({accounts: []});
    const [account, setAccount] = useState({});

    // get all accounts when the page is rendered
    useEffect(() => {
        fetch("api/get-accounts")
            .then((response) => response.json())
            .then((data) => {
                setState({accounts: data})
            });
    }, []);

    // renders a entry in the table for a given account. also sends the DELETE-Request when the entry is deleted
    const showAccount = (account) => {

        // for deleting an entry
        function handleDelete() {
            console.log("delete it")
            const requestOptions = {
                method: "DELETE",
            };
            return fetch("/api/account/" + account.id, requestOptions)
                .then((response) => {
                    // when deletion worked, remove the account from the state
                    if (response.ok) {
                        const array = [...state.accounts];
                        const index = array.indexOf(account);
                        if (index !== 1) {
                            array.splice(index, 1)
                            setState({accounts: array})
                        }
                    }
                })
        }

        // for editing an entry
        function handleUpdate() {
            console.log("update it")
            const requestOptions = {
                method: "PUT",
            };
            return fetch("/api/account/" + account.id, requestOptions)
                .then((response) => {
                    // when deletion worked, remove the account from the state
                    if (response.ok) {
                        console.log("updated it")
                    }
                })
        }

        return (
            <TableRow component={Link} to={'/account/'+account.id} hover key={account.id}>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.get_account_type_display}</TableCell>
                <TableCell>{account.created_at}</TableCell>
                <TableCell><BalanceDisplay account={account}/></TableCell>
                {/*<TableCell>*/}
                {/*    <IconButton>*/}
                {/*        <DeleteOutlineOutlinedIcon style={{color: "red"}} onClick={handleDelete}/>*/}
                {/*    </IconButton>*/}
                {/*    <IconButton>*/}
                {/*        <EditOutlinedIcon color={"secondary"} onClick={() => handleClickEdit(account)}/>*/}
                {/*    </IconButton>*/}
                {/*</TableCell>*/}
            </TableRow>
        )

    }

    // State for the new Account form dialog
    const [dialog, setDialog] = React.useState({
        open: false,
        edit: false,
    });

    const handleClickNew = () => {
        setDialog({
            ...dialog,
            open: true,
            edit: false,
        });
        setAccount({});
    };

    const handleClickEdit = (account) => {
        console.log(account.account_type)
        setDialog({
            open: true,
            edit: true,
        });
        setAccount(account);
    };

    const handleClose = () => {
        setDialog({
            ...dialog,
            open: false,
        });
    };

    const saveNewAccount = (acc) => {
        let accounts = state.accounts
        accounts.push(acc)
        setState({accounts: accounts})

        setDialog({
            ...dialog,
            open: false,
        });
    }

    // TODO: hacky Solution for updating the table when editing an entry, without fetch would be nice
    const updateList = () => {
        fetch("api/get-accounts")
            .then((response) => response.json())
            .then((data) => {
                setState({accounts: data})
            });
    }


    return (
        <Paper>
            <Toolbar>
                <Button aria-label="add" color={"primary"} variant={"outlined"} startIcon={<AddIcon/>}
                        onClick={handleClickNew}>
                    New
                </Button>
                <NewAccountDialog handleClose={handleClose} onSaveNew={saveNewAccount} setDialog={setDialog}
                                  dialog={dialog} setAccount={setAccount} account={account} updateList={updateList}/>
            </Toolbar>
            <TableContainer>
                <Table className={classes.table} aria-label={"accounts"}>

                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.accounts.map(showAccount)}
                    </TableBody>
                </Table>
                <AbstractTable
                    items={state.accounts}
                    headBodyMap={
                        {
                            ID: (item) => item.id,
                            Name: (item) => <Link to={'/account/'+item.id}>{item.name}</Link>,
                            Type: (item) => item.get_account_type_display,
                            "Created At": (item) => item.created_at,
                            "Balance": (item) => <BalanceDisplay account={item}/>,
                        }
                    }
                />
            </TableContainer>
        </Paper>
    );
}