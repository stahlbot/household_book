import {Checkbox, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import React from "react";

export default function AbstractTable(props) {
    const {
        children,
        items,
        headBodyMap,
        ...other
    } = props;

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