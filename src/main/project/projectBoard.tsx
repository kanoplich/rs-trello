import * as React from 'react';
import { useState } from 'react';
import { Box, Button, IconButton } from '@mui/material/';
import ClearIcon from '@mui/icons-material/Clear';
import Add from '@mui/icons-material/Add';
interface IBoard {
  data: string
  key: number
}

export function ProjectBoard({ data }: IBoard) {

  const [textFiled, setTextFiled] = useState(false);

  return (
    <Box
      sx={{
        width: "260px",
        minWidth: "260px",
        minHeight: "260px",
        borderRadius: "5px",
        backgroundColor: "#F4F5F7",
        position: "relative",
      }}>
      <Box sx={{
        display: "flex",
        alignItems: "center",
      }}>
        <input className='project-board__title'
          type='text'
          defaultValue={data}
          required
        />
        <IconButton
          sx={{
            borderRadius: "3px",
          }}>
          <ClearIcon fontSize="medium" />
        </IconButton>
      </Box>
      {textFiled &&
        <textarea className='project__to-do'
          placeholder='What needs to be done?'
          autoFocus
          rows={3}
        ></textarea>
      }
      <Button variant="text" color="inherit"
        startIcon={<Add />}
        sx={{
          color: "#172B4D",
          width: 1,
          textTransform: "lowercase",
        }}
        onClick={() => setTextFiled(true)}
      >Create issue</Button>
    </Box>
  );
}