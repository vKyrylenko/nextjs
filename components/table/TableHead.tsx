import { FunctionComponent } from 'react';
import MuiTableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { ITableHead } from './models';

export const TableHead: FunctionComponent<Partial<ITableHead>> = ({
  onSelectAllClick,
  order,
  orderBy,
  cells,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {cells.map((headCell) => (
          <TableCell
            key={headCell.name}
            align="left"
            style={headCell.width ? { width: `${headCell.width}%`, minWidth: `${headCell.width}%` } : undefined}
            sortDirection={orderBy === headCell.name ? order : false}
          >
            {headCell.isSortable ? (
              <TableSortLabel
                active={orderBy === headCell.name}
                direction={orderBy === headCell.name ? order : 'asc'}
                onClick={createSortHandler(headCell.name)}
              >
                {headCell.name}
              </TableSortLabel>
            ) : (
              headCell.name
            )}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};
