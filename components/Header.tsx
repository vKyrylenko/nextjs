import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(() => ({
  item: {
    marginRight: '15px',
  },
}));

const Header: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Link href="/">
          <a className={classes.item}>Home</a>
        </Link>
        <Link href="/library">
          <a className={classes.item}>Library</a>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
