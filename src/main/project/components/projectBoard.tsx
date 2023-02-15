import * as React from 'react';
import { useState } from 'react';
import { Box, IconButton } from '@mui/material/';
import ClearIcon from '@mui/icons-material/Clear';
import { ProjectTodo } from './projectTodo';
import { BtnTodo } from './BtnTodo';
import { BoardsType } from '../../../types';

interface IBoardsType {
  data: BoardsType,
  idProject: number,
}

export function ProjectBoard({ data, idProject }: IBoardsType) {

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
        paddingBottom: "5px",
      }}>
        <span className='project-board__title'>{data.title}</span>
        <IconButton
          sx={{
            borderRadius: "3px",
          }}>
          <ClearIcon fontSize="medium" />
        </IconButton>
      </Box>
      {
        data.cards.map(elem => <ProjectTodo data={elem} key={elem.id} />)
      }
      <BtnTodo data={data} idProject={idProject} />
    </Box>
  );
}