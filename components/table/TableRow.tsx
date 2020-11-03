import { FunctionComponent } from 'react';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import MuiTableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { IRow } from './models';
import Link from 'next/link';

const useStyles = makeStyles(() => ({
  cell: {
    padding: '8px',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export const TableRow: FunctionComponent<IRow> = ({ cells, onClick, row, isSelectable, keyName, selected }) => {
  const classes = useStyles();

  return (
    <MuiTableRow hover role="checkbox" aria-checked={selected} tabIndex={-1} key={keyName} selected={selected}>
      {isSelectable && (
        <TableCell padding="checkbox" onClick={(event) => onClick(event, keyName)}>
          <Checkbox checked={selected} />
        </TableCell>
      )}
      {cells.map((cell, index) => {
        return (
          <TableCell key={index} scope="row" className={classes.cell}>
            {cell.cellRenderer ? cell.cellRenderer(row, cell.name) : row[cell.name]}
          </TableCell>
        );
      })}
    </MuiTableRow>
  );
};
