import { Button } from '@mui/material/';
import { Box, Card, IconButton } from '@mui/material/';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import Add from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import Textarea from 'react-textarea-autosize';
import { addTaskBoard } from '../../../store/actions';
import { BoardsType } from '../../../types';


interface IBoardsType {
  data: BoardsType,
  idProject: number,
}

export function BtnTodo({data, idProject}: IBoardsType) {

  const [form, setForm] = useState(false);
  const [textForm, setTextForm] = useState('');
  const dispatch = useDispatch()

  const setFormItems = () => {
    setTextForm('');
    setForm(false);
  }

  const setCardTask = () => {
    if(textForm.trim()) {
      dispatch(addTaskBoard({
        id: 1,
        idCard: data.id,
        idProject: idProject,
        text: textForm,
      }))
    }
  }

  const renderForm = () => {

    return (
      <>
        <Card
          style={{
            overflow: "visible",
            minHeight: "70px"
          }}
        >
          <Textarea
            placeholder='What needs to be done?'
            autoFocus
            onBlur={() => setFormItems()}
            value={textForm}
            onChange={(e) => setTextForm(e.target.value)}
            style={{
              resize: "none",
              width: "100%",
              padding: "5px",
              borderRadius: "5px",
              outline: "none",
              border: "none",
            }}
          />
        </Card>
        <Box sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "2px",
        }}>
          <IconButton
            onMouseDown={() => setCardTask()}
            sx={{
              borderRadius: "3px",
            }}>
            <CheckIcon fontSize="medium" />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: "3px",
            }}
          >
            <ClearIcon fontSize="medium" />
          </IconButton>
        </Box>
      </>
    );
  }

  const renderBtn = () => {

    return (
      <>
        <Button variant="text" color="inherit"
          startIcon={<Add />}
          sx={{
            color: "#172B4D",
            width: 1,
            textTransform: "lowercase",
          }}
          onClick={() => setForm(true)}
        >Create issue</Button>
      </>
    );
  }


  return (
    <>
      {
        form ? renderForm() : renderBtn()
      }
    </>
  );
}