import React from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { checkProjectModal } from '../store/actions';

export default function CreateBtn({ text }: { text: string }) {
  const dispatch = useDispatch();
  return (
    <Button
      variant='text'
      sx={{ color: 'inherit', maxHeight: '2.25rem', margin: 'auto 0' }}
      onClick={() => {
        dispatch(checkProjectModal(true));
      }}
    >
      {text}
    </Button>
  );
}
