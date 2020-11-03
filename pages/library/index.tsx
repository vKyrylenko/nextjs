import { FunctionComponent } from 'react';
import { getData } from '../../lib/posts';
import { getComparator, stableSort } from '../../components/table/utils';
import { IBook, IMagazine } from '../../schemas';
import { LibraryContainer } from '../../containers/LibraryContainer';

const Library: FunctionComponent<{ data: Array<IBook | IMagazine> }> = ({ data }) => {
  return <LibraryContainer data={data} />;
};

export async function getStaticProps() {
  const data = await getData(['books.csv', 'magazines.csv']);

  return {
    props: {
      data: stableSort(data, getComparator('asc', 'title')),
    },
  };
}

export default Library;
