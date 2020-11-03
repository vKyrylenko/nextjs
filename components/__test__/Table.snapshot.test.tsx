import React from 'react';
import renderer from 'react-test-renderer';
import { Table } from '../table/Table';
import { CELLS } from '../../containers/LibraryContainer';

it('renders correctly', () => {
  const tree = renderer.create(<Table data={[]} cells={CELLS} defaultSortColumn="title" />).toJSON();
  expect(tree).toMatchSnapshot();
});
