import { SyntheticEvent } from 'react';

export interface IRowData {
  [key: string]: any;
}

export interface ITable {
  data?: Array<IRowData>;
  defaultSortColumn: string;
  cells: Array<ICell>;
  onRemoveItem?: (ids: string[]) => void;
  onExportItems?: (ids: string[]) => void;
  onToggleAddItem?: () => void;
  onSearch?: (search: string) => void;
}

export interface IRow {
  cells: Array<ICell>;
  keyName: string;
  onClick: (e, keyName) => void;
  selected?: boolean;
  isSelectable?: boolean;
  row: IRowData;
}

export interface ICell {
  name: string;
  width?: number;
  isSortable?: boolean;
  cellRenderer?: (data: IRowData, cellName: string) => void;
}

export interface ITableHead {
  onSelectAllClick: (e: SyntheticEvent) => void;
  order: 'asc' | 'desc';
  orderBy: string;
  cells: Array<ICell>;
  numSelected: number;
  rowCount: number;
  onRequestSort: (data: string) => void;
}

export interface ITableToolBar {
  numSelected?: number;
  onRemoveButtonClick: () => void;
  onExportButtonClick: () => void;
  onSearch?: (search: string) => void;
  onToggleAddButtonClick?: () => void;
}
