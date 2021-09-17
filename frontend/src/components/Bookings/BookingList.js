import React, {useEffect} from "react";
import {Card, CardContent, CardHeader, Divider} from "@material-ui/core";

export default function BookingList() {

    useEffect(() => {
        const requestOptions = {
                method: "GET",
            };
        fetch("api/bookings", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            });
    }, []);

    return(
        <React.Fragment>
            <Card>
                <CardHeader title={"Bookings"}/>
                <Divider/>
                <CardContent>
                    Tabelle
                </CardContent>
            </Card>
        </React.Fragment>
    );
}