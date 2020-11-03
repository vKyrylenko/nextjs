import React, { FunctionComponent, useState } from 'react';
import { Paper } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from './TableRow';
import { TableHead } from './TableHead';
import { TableToolBar } from './TableToolBar';
import { useStyles } from './Table.styles';
import { ITable } from './models';
import { getComparator, SortOrders, stableSort } from './utils';

const ROWS_PER_PAGE = 5;

export const Table: FunctionComponent<ITable> = ({
  data,
  defaultSortColumn,
  cells,
  onRemoveItem,
  onToggleAddItem,
  onSearch,
  onExportItems,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState(SortOrders.ASC);
  const [orderBy, setOrderBy] = useState(defaultSortColumn);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === SortOrders.ASC;
    setOrder(isAsc ? SortOrders.DESC : SortOrders.ASC);
    if (orderBy !== property) {
      setOrderBy(property);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.isbn);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onRemoveButtonClick = () => {
    onRemoveItem(selected);
    setSelected([]);
  };

  const onExportButtonClick = () => {
    onExportItems(selected);
    setSelected([]);
  };

  const onToggleAddButtonClick = () => {
    onToggleAddItem();
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolBar
          numSelected={selected.length}
          onRemoveButtonClick={onRemoveButtonClick}
          onToggleAddButtonClick={onToggleAddButtonClick}
          onSearch={onSearch}
          onExportButtonClick={onExportButtonClick}
        />
        <TableContainer>
          <MuiTable stickyHeader={true} size="medium">
            <TableHead
              numSelected={selected.length}
              cells={cells}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
                .map((row) => {
                  const isItemSelected = isSelected(row.isbn);
                  return (
                    <TableRow
                      row={row}
                      isSelectable={true}
                      onClick={handleClick}
                      aria-checked={isItemSelected}
                      keyName={row.isbn}
                      key={row.isbn}
                      selected={isItemSelected}
                      cells={cells}
                    />
                  );
                })}
              {!data.length && (
                <MuiTableRow>
                  <TableCell colSpan={6}>No data</TableCell>
                </MuiTableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPageOptions={[]}
          rowsPerPage={ROWS_PER_PAGE}
          labelRowsPerPage=""
          page={page}
          onChangePage={handleChangePage}
        />
      </Paper>
    </div>
  );
};
