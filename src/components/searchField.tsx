import * as React from 'react';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';
import { checkProjectSearchField } from '../store/actions';

export default function SearchField() {
  const dispatch = useDispatch();
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant='standard' id='outlined'>
        <Input
          id='input-with-icon-adornment'
          onChange={event =>
            dispatch(checkProjectSearchField(event.target.value))
          }
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
