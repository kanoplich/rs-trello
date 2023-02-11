import * as React from 'react';
import { useState } from 'react';
import { Box, TextField, Button, IconButton } from '@mui/material/';
import ClearIcon from '@mui/icons-material/Clear';
import Add from '@mui/icons-material/Add';

export type BoardType = {
  key: number | string,
  title: string,
}

export function ProjectBoard(props: BoardType) {

  const [textFiled, setTextFiled] = useState(false);

  return (
    <Box
      sx={{
        width: "260px",
        minWidth: "260px",
        minHeight: "260px",
        borderRadius: "5px",
        backgroundColor: "#F4F5F7",
      }}>
      <Box sx={{ 
        display: "flex",
        alignItems: "center",
        }}>
        <TextField
          defaultValue={props.title}
          sx={{
            width: .8,
            color: "#172B4D",
            border: 'none',
            "& fieldset": { border: 'none' },
          }} />
          <IconButton sx={{
            borderRadius: "3px",
          }}>
            <ClearIcon fontSize="medium" />
          </IconButton>
      </Box>
      {textFiled &&
        <TextField
          multiline
          rows={2}
          sx={{
            width: 1,
            backgroundColor: "white"
          }} />
      }
      <Button variant="text" color="inherit"
        startIcon={<Add />}
        sx={{
          color: "#172B4D",
          width: 1,
          textTransform: "lowercase",
        }}
        onClick={() => setTextFiled((prev) => !prev)}
      >Create issue</Button>
    </Box>
  );
}