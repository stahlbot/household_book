import React from "react";
import {Card, CardContent, CardHeader, Divider} from "@material-ui/core";

export default function BookingList() {


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