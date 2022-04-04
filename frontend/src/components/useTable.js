import {Checkbox, Menu, MenuItem, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import React from "react";

export default function AbstractTable(props) {
    const {
        children,
        items,
        headBodyMap,
        ...other
    } = props;

    // Selecting a row and checkbox

    const [selected, setSelected] = React.useState([]);

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = items.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    // Contextmenu

    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event, rowID) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                    rowID: rowID,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                  // Other native context menus might behave different.
                  // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleDelete = (rowId) => {
        console.log("delete" + rowId);
        handleClose();
    };

    // Creating the Header and Content of the Table

    const createTableRow = (row) => {
        let cells = [];
        for (const [key, value] of Object.entries(headBodyMap)) {
            cells.push(value(row))
        }

        const isItemSelected = isSelected(row.id);

        return (
                <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    onContextMenu={(event) => handleContextMenu(event, row.id)}
                    key={row.id}
                    selected={isItemSelected}
                >
                    <TableCell>
                        <Checkbox
                            color={"primary"}
                            checked={isItemSelected}
                        />
                    </TableCell>
                    {cells.map(cell => <TableCell>{cell}</TableCell>)}
                </TableRow>
        );
    }

    const createTableHead = () => {
        let headList = [];
        for (const [key, value] of Object.entries(headBodyMap)) {
            headList.push(key)
        }
        return (
            <TableRow>
                <TableCell>
                    <Checkbox
                        color="primary"
                        indeterminate={selected.length > 0 && selected.length < items.length}
                        checked={items.length > 0 && selected.length === items.length}
                        onChange={handleSelectAllClick}
                    />
                </TableCell>
                {headList.map(header => <TableCell>{header}</TableCell>)}
            </TableRow>
        );
    };

    return (
        <Table>
            <TableHead>
                {createTableHead()}
            </TableHead>
            <TableBody>
                {items.map(item => createTableRow(item))}
            </TableBody>
            <Menu
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? {top: contextMenu.mouseY, left: contextMenu.mouseX}
                            : undefined
                    }
                >
                    <MenuItem onClick={() => handleDelete(contextMenu.rowID)}>Delete</MenuItem>
                </Menu>
        </Table>
    );
}