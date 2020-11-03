import Header from './Header';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { FunctionComponent, ReactNode } from 'react';

const useStyles = makeStyles(() => ({
  main: {
    margin: '64px 32px 0 32px',
  },
}));

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <main className={classes.main}>{children}</main>
    </>
  );
};

export default Layout;
