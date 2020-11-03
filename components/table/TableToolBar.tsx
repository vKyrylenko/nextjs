import React, { FocusEvent, FunctionComponent, useState } from 'react';
import { Toolbar } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { ITableToolBar } from './models';
import { useToolbarStyles } from './Table.styles';

export const TableToolBar: FunctionComponent<ITableToolBar> = ({
  onRemoveButtonClick,
  onToggleAddButtonClick,
  numSelected,
  onSearch,
  onExportButtonClick,
}) => {
  const classes = useToolbarStyles();
  const [filter, setFilter] = useState('');

  const changeFilterHandler = (e: FocusEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <h3 className={classes.title}>Library</h3>
      )}

      {onSearch && !numSelected && <TextField defaultValue={filter} onBlur={changeFilterHandler} />}

      {!numSelected && onExportButtonClick ? (
        <Tooltip title="Export">
          <IconButton aria-label="export" onClick={onExportButtonClick}>
            <ImportExportIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={onRemoveButtonClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={onToggleAddButtonClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};
