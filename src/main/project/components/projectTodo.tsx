import '../project.css';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { CardsType } from '../../../types';
import { useState } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { deleteTaskBoard } from '../../../store/actions';
import { Draggable } from 'react-beautiful-dnd';

interface ICardsType {
  data: CardsType
  idProject: number
  idCard: number
  index: number
}

export function ProjectTodo({ index, data, idProject, idCard }: ICardsType) {

  const [state, setState] = useState(false)
  const dispatch = useDispatch();

  const deleteTask = () => {
    dispatch(deleteTaskBoard({
      idProject: idProject,
      idCard: idCard,
      text: '',
      id: data.id,
    }))
  }

  const hoverBtn = () => {
    return (
      <IconButton
        onClick={() => deleteTask()}
        sx={{
          borderRadius: "3px",
          position: 'absolute',
          right: 0,
          top: 0,
        }}>
        <ClearIcon fontSize="medium" />
      </IconButton>
    );
  }

  return (
    <Draggable draggableId={String(data.id)} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          
        <Card
          onMouseEnter={() => setState(true)}
          onMouseLeave={() => setState(false)}
          sx={{
            marginBottom: "7px",
            position: 'relative',
          }}>
          <CardContent
            sx={{
              paddingBottom: '24px',
            }}
          >
            <Typography
              sx={{
                width: '200px',
              }}
              gutterBottom>{data.text}</Typography>
          </CardContent>
          {state && hoverBtn()}
        </Card> 

        </div>
      )}

    </Draggable>
  );
}