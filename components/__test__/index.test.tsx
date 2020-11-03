import React from 'react';
import { mount } from 'enzyme';
import Home from '../../pages';
import { Table } from '../table/Table';
import { CELLS } from '../../containers/LibraryContainer';

describe('Pages', () => {
  describe('Index', () => {
    it('should render without throwing an error', () => {
      const wrap = mount(<Home />);
      expect(wrap.find('h3').text()).toBe('Possible improvements');
    });
  });
  describe('Table', () => {
    it('select all', () => {
      const wrap = mount(
        <Table
          data={[{ title: 'Title', authors: 'Author', description: 'Description', isbn: '1234-5678' }]}
          cells={CELLS}
          defaultSortColumn="title"
        />,
      );
      wrap.find('input').at(1).simulate('click');
      const selectAllCheckbox = wrap.find('input').at(0);

      expect(selectAllCheckbox.prop('checked')).toBeTruthy();
    });

    it('filter input', () => {
      const wrap = mount(
        <Table
          data={[{ title: 'Title', authors: 'Author', description: 'Description', isbn: '1234-5678' }]}
          cells={CELLS}
          onSearch={() => {}}
          defaultSortColumn="title"
        />,
      );

      wrap.find('input').at(2).simulate('click');
      expect(wrap.find('input[type="text"]')).toEqual({});
    });
  });
});
