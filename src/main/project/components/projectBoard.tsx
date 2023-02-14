import * as React from 'react';
import { Box, IconButton } from '@mui/material/';
import ClearIcon from '@mui/icons-material/Clear';
import { ProjectTodo } from './projectTodo';
import { BtnTodo } from './BtnTodo';
import { BoardsType } from '../../../types';

interface IBoardsType {
  data: BoardsType
}

export function ProjectBoard({data}: IBoardsType) {

  return (
    <Box
      sx={{
        width: "260px",
        minWidth: "260px",
        minHeight: "260px",
        borderRadius: "5px",
        backgroundColor: "#F4F5F7",
        position: "relative",
        padding: "5px",
      }}>
      <Box sx={{
        display: "flex",
        alignItems: "center",
      }}>
        <input className='project-board__title'
          type='text'
          defaultValue={data.title}
          required
        />
        <IconButton
          sx={{
            borderRadius: "3px",
          }}>
          <ClearIcon fontSize="medium" />
        </IconButton>
      </Box>
      {
        data.cards.map(elem => <ProjectTodo data={elem} key={elem.id}/>)
      }
      <BtnTodo data={data}/>
    </Box>
  );
}