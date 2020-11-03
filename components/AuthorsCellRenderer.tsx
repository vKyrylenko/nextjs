import { FunctionComponent } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const useAuthorsCellRendererStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const AuthorsCellRenderer: FunctionComponent<{ authors: string }> = ({ authors }) => {
  const classes = useAuthorsCellRendererStyles();
  const splittedAuthors = authors.split(',');

  return (
    <div className={classes.root}>
      {splittedAuthors?.map((author) => {
        return <span key={author}>{author}</span>;
      })}
    </div>
  );
};
