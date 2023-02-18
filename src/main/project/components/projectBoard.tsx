import * as React from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { Box, IconButton } from '@mui/material/';
import ClearIcon from '@mui/icons-material/Clear';
import { ProjectTodo } from './projectTodo';
import { BtnTodo } from './BtnTodo';
import { BoardsType } from '../../../types';
import { deleteCardBoard } from '../../../store/actions';
import { Droppable } from 'react-beautiful-dnd';

interface IBoardsType {
  data: BoardsType,
  idProject: number,
}

export function ProjectBoard({ data, idProject }: IBoardsType) {

  const dispatch = useDispatch();

  const deleteCard = () => {
    dispatch(deleteCardBoard({
      id: data.id,
      idProject: idProject,
      cards: [],
      title: '',
    }))
  }

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
      <Droppable droppableId={String(data.id)}> // @ts-expect-error: reason
        <Box sx={{
          display: "flex",
          alignItems: "center",
          paddingBottom: "5px",
        }}>
          <span className='project-board__title'>{data.title}</span>
          <IconButton
            onClick={() => deleteCard()}
            sx={{
              borderRadius: "3px",
            }}>
            <ClearIcon fontSize="medium" />
          </IconButton>
        </Box>
        {
          data.cards.map(elem => <ProjectTodo data={elem} idCard={data.id} idProject={idProject} key={elem.id} />)
        }
      </Droppable>
      <BtnTodo data={data} idProject={idProject} />
    </Box>
  );
}