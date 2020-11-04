import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { getData, getDataItem } from '../../../lib/posts';
import { IMagazine } from '../../../schemas';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useLibraryIdStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
  },
}));

const Id: FunctionComponent<{ data: IMagazine }> = ({ data }) => {
  const classes = useLibraryIdStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.row}>
          <span>Title :</span>
          <span>{data.title}</span>
        </div>
        <div className={classes.row}>
          <span>Isbn :</span>
          <span>{data.isbn}</span>
        </div>
        <div className={classes.row}>
          <span>Authors :</span>
          <div className={classes.root}>
            {data.authors.split(',').map((author) => (
              <span>{author}</span>
            ))}
          </div>
        </div>

        {data.description && (
          <div className={classes.row}>
            <span>Description :</span>
            <span>{data.description}</span>
          </div>
        )}

        {data.publishedAt && (
          <div className={classes.row}>
            <span>Published :</span>
            <span>{data.publishedAt}</span>
          </div>
        )}
      </div>
      <Link href="/library">
        <a>Back to library</a>
      </Link>
    </>
  );
};

export async function getStaticPaths() {
  const data = await getData(['books.csv', 'magazines.csv']);

  const paths = data.map((item) => ({
    params: {
      entity: item.entity,
      id: item.isbn,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const {
    params: { entity, id },
  } = context;
  const data = await getDataItem(entity, id);
  return {
    props: {
      data,
    },
  };
}

export default Id;
