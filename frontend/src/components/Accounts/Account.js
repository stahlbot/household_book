import React, {useEffect, useState} from "react";

export default function Account(props) {
    const [account, setAccount] = useState({})

    useEffect(() => {
        let id = props.match.params.id
        const requestOptions = {
            method: "GET",
        };
        fetch("../api/account/" + id)
            .then((response) => response.json())
            .then((data) => {
                setAccount(data);
                // setLoading(false);
                console.log(data)
            });
    },[])

    return(
        <React.Fragment>
            <h1>{account.name}</h1>
        </React.Fragment>
    )
}