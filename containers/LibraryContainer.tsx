import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import Link from 'next/link';
import { Table } from '../components/table/Table';
import { AuthorsCellRenderer } from '../components/AuthorsCellRenderer';
import { IBook, IMagazine } from '../schemas';
import { NewBookDialog } from '../components/NewBookDialog';

export const CELLS = [
  {
    name: 'title',
    isSortable: true,
    width: 17,
  },
  {
    name: 'authors',
    cellRenderer: (data, cellName) => {
      return <AuthorsCellRenderer authors={data[cellName]} />;
    },
    width: 18,
  },
  {
    name: 'description/publishedAt',
    cellRenderer: (data) => data.description || data.publishedAt,
    width: 55,
  },
  {
    name: 'view',
    cellRenderer: (data) => (
      <Link href={`/library/${data.entity}/${data.isbn}`}>
        <a>View</a>
      </Link>
    ),
    width: 10,
  },
];

const isPartlyIncludes = (item, field, search) => {
  return item[field].toString().toLowerCase().includes(search.toLowerCase());
};

interface ILibraryContainer {
  data: Array<IBook | IMagazine>;
}

export const LibraryContainer: FunctionComponent<ILibraryContainer> = ({ data }) => {
  const [library, setLibrary] = useState(data);
  const exportButton = useRef();
  const [newDialog, setNewDialog] = useState(false);
  const [exportFiles, setExportFiles] = useState(false);

  useEffect(() => {
    if (exportButton && exportButton.current && exportFiles) {
      // @ts-ignore
      exportButton.current.link.click();
      setExportFiles(false);
    }
  }, [exportButton, exportFiles]);

  const onRemoveItem = (ids: string[]) => {
    setLibrary((prevLibrary) =>
      prevLibrary.filter(
        ({ isbn }) =>
          !ids.some((id) => {
            return id === isbn;
          }),
      ),
    );
  };

  const onExportItems = (ids: string[]) => {
    setExportFiles(true);
  };

  const onToggleAddItem = () => {
    setNewDialog((prevState) => !prevState);
  };

  const onSaveItem = (item) => {
    setLibrary((prevState) => [...prevState, item]);
  };

  const onSearch = (search) => {
    if (!search) {
      setLibrary(data);
    }
    setLibrary((prevState) =>
      prevState.filter((item) => {
        return isPartlyIncludes(item, 'isbn', search) || isPartlyIncludes(item, 'authors', search);
      }),
    );
  };

  return (
    <>
      <Table
        data={library}
        defaultSortColumn="title"
        cells={CELLS}
        onRemoveItem={onRemoveItem}
        onExportItems={onExportItems}
        onToggleAddItem={onToggleAddItem}
        onSearch={onSearch}
      />
      {newDialog && <NewBookDialog onClose={onToggleAddItem} onSave={onSaveItem} />}

      <CSVLink style={{ display: 'none' }} ref={exportButton} data={library} filename="library.csv" />
    </>
  );
};
