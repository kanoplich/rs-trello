import * as React from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { Box, IconButton } from '@mui/material/';
import ClearIcon from '@mui/icons-material/Clear';
import { ProjectTodo } from './projectTodo';
import { BtnTodo } from './BtnTodo';
import { BoardsType, CardsType } from '../../../types';
import { deleteCardBoard } from '../../../store/actions';
import { Droppable } from 'react-beautiful-dnd';
import { getProjectsSearchField } from '../../../store/selectors';
import { useSelector } from "react-redux";

interface IBoardsType {
  data: BoardsType,
  idProject: number,
  searchParams: CardsType[],
}

export function ProjectBoard({ searchParams, data, idProject }: IBoardsType) {

  const dispatch = useDispatch();

  const deleteCard = () => {
    dispatch(deleteCardBoard({
      id: data.id,
      idProject: idProject,
      cards: [],
      title: '',
    }))
  }

  const search = useSelector(getProjectsSearchField);

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
          onClick={() => deleteCard()}
          sx={{
            borderRadius: "3px",
          }}>
          <ClearIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Droppable droppableId={String(data.id)}>
        {(provided) => (
          <div className='todo__wrapper' {...provided.droppableProps} ref={provided.innerRef}>
            {
              !search.length ?
                            data.cards.map((elem, index) => (<ProjectTodo index={index} data={elem} idCard={data.id} idProject={idProject} key={elem.id} />))
                            : searchParams.map((elem, index) => (<ProjectTodo index={index} data={elem} idCard={data.id} idProject={idProject} key={elem.id} />))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <BtnTodo data={data} idProject={idProject} />
    </Box>

  );
}