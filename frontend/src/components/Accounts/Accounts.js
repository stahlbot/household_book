import React, {useEffect, useState} from "react";
import AccountsList from "./AccountsList";

export default function Accounts(){
    const [state, setState] = useState({accounts: []});

    useEffect(() => {
        fetch("api/get-accounts")
            .then((response) => response.json())
            .then((data) => {
                setState({accounts: data, am: data.length})
            })
    }, []);


    return (
        <React.Fragment>
            <h1>Accounts</h1>
            <AccountsList accounts={state.accounts}/>
        </React.Fragment>
    )

}
