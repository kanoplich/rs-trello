import * as React from 'react';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';
import { checkProjectSearchField } from '../store/actions';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchField() {
  const defferedSearch = useDebouncedCallback((search: string) => {
    dispatch(checkProjectSearchField(search));
  }, 500);
  const dispatch = useDispatch();
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant='standard' id='outlined'>
        <Input
          id='input-with-icon-adornment'
          onChange={event => defferedSearch(event.target.value)}
          startAdornment={
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
