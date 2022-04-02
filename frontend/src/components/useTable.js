import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import React from "react";

export default function AbstractTable(props){
    const {
        children,
        items,
        headBodyMap,
        ...other
    } = props;

    const createTableHead = () => {
        let headList = [];
        console.log(headBodyMap);
        for (const [key, value] of Object.entries(headBodyMap)) {
            headList.push(key)
        }
        return (
            <TableRow>
                {headList.map(header => <TableCell>{header}</TableCell>)}
            </TableRow>
        );
    };

    const createTableRow = (item) => {
        let cells = [];
        for (const [key, value] of Object.entries(headBodyMap)) {
            cells.push(value(item))
        }
        return (
            <TableRow>
                {cells.map(cell => <TableCell>{cell}</TableCell>)}
            </TableRow>
        );
    }

    return (
        <Table>
            <TableHead>
                {createTableHead()}
            </TableHead>
            <TableBody>
                {items.map(item => createTableRow(item))}
            </TableBody>
        </Table>
    );
}