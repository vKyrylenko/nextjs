import React, { FunctionComponent, ReactNode } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Header from './Header';

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
