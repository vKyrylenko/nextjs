export const SortOrders: { [index: string]: 'asc' | 'desc' } = {
  DESC: 'desc',
  ASC: 'asc',
};

export function descendingComparator(a, b, orderBy) {
  return a && b && b[orderBy].localeCompare(a[orderBy]);
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
