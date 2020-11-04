import React, { FocusEvent, FunctionComponent, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { IMagazine } from '../schemas';

const BOOK_TYPES = {
  BOOK: 'BOOK',
  MAGAZINE: 'MAGAZINE',
};

const INITIAL_STATE = {
  title: '',
  isbn: '',
  authors: '',
  publishedAt: '',
  description: '',
  entity: BOOK_TYPES.BOOK,
};

export const useNewBookDialogStyles = makeStyles(() => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface INewBookDialog {
  onClose: () => void;
  onSave: (data: IMagazine) => void;
}

export const NewBookDialog: FunctionComponent<INewBookDialog> = ({ onClose, onSave }) => {
  const [newBook, setNewBook] = useState(INITIAL_STATE);
  const classes = useNewBookDialogStyles();

  const handleEntityChange = () => {
    setNewBook((prevState) => {
      const magazineType = prevState.entity === BOOK_TYPES.BOOK;
      return {
        ...prevState,
        entity: magazineType ? BOOK_TYPES.MAGAZINE : BOOK_TYPES.BOOK,
        description: magazineType ? '' : prevState.description,
        publishedAt: magazineType ? prevState.publishedAt : '',
      };
    });
  };

  const onFieldChange = (e: FocusEvent<HTMLInputElement>) =>
    setNewBook((prevBook) => ({
      ...prevBook,
      [e.target.name]: e.target.value,
    }));

  const onSaveHandler = () => {
    onSave(newBook);
    onClose();
  };

  const validateFields = () =>
    newBook.title && newBook.isbn && newBook.authors && (newBook.publishedAt || newBook.description);

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Add new entity</DialogTitle>
      <DialogContent>
        <div className={classes.column}>
          <FormControlLabel control={<Switch onChange={handleEntityChange} color="primary" />} label={newBook.entity} />

          <TextField required name="title" label="Title" defaultValue={newBook.title} onBlur={onFieldChange} />
          <TextField required name="isbn" label="ISBN" defaultValue={newBook.isbn} onBlur={onFieldChange} />
          <TextField required name="authors" label="Authors" defaultValue={newBook.authors} onBlur={onFieldChange} />
          {newBook.entity === BOOK_TYPES.BOOK && (
            <TextField
              required
              name="description"
              label="Description"
              defaultValue={newBook.description}
              onBlur={onFieldChange}
            />
          )}
          {newBook.entity === BOOK_TYPES.MAGAZINE && (
            <TextField
              required
              name="publishedAt"
              label="Published"
              defaultValue={newBook.description}
              onBlur={onFieldChange}
            />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSaveHandler} color="primary" disabled={!validateFields()}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
