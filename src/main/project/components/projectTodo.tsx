import '../project.css';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { CardsType } from '../../../types';
import { useState } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { deleteTaskBoard } from '../../../store/actions';

interface ICardsType {
  data: CardsType
  idProject: number
  idCard: number
}

export function ProjectTodo({ data, idProject, idCard }: ICardsType) {

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
  );
}