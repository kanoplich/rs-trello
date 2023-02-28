import '../project.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import Add from '@mui/icons-material/Add';
import { Box, IconButton } from '@mui/material/';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { addCardBoard } from '../../../store/actions';
import { ProjectType } from '../../../types';
import { addColumnToUser } from '../../../components/function-API';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/selectors';

interface IData {
  data: ProjectType;
}

export function BtnAddCard({ data }: IData) {
  const user = useSelector(getUser);
  const [form, setForm] = useState(false);
  const [textForm, setTextForm] = useState('');
  const dispatch = useDispatch();

  const setFormItems = () => {
    setTextForm('');
    setForm(false);
  };

  const setCardTitle = () => {
    if (textForm.trim()) {
      dispatch(
        addCardBoard({
          title: textForm,
          id: data.columns.length + 1,
          cards: [],
          idProject: data.id,
        })
      );
      addColumnToUser(user, data.id, {
        title: textForm,
        id: data.columns.length + 1,
        cards: [],
      });
    }
  };

  const renderBtnAdd = () => {
    return (
      <>
        <IconButton
          onClick={() => setForm(true)}
          sx={{
            borderRadius: '3px',
          }}
        >
          <Add fontSize='medium' />
        </IconButton>
      </>
    );
  };

  const renderForm = () => {
    return (
      <>
        <Box
          sx={{
            width: '260px',
            minWidth: '260px',
            minHeight: '260px',
            borderRadius: '5px',
            backgroundColor: '#F4F5F7',
            position: 'relative',
            padding: '10px 5px 5px 5px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              className='project-board__title'
              type='text'
              autoFocus
              onBlur={() => setFormItems()}
              onChange={e => setTextForm(e.target.value)}
              defaultValue={textForm}
              required
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '2px',
            }}
          >
            <IconButton
              onMouseDown={() => setCardTitle()}
              sx={{
                borderRadius: '3px',
              }}
            >
              <CheckIcon fontSize='medium' />
            </IconButton>
            <IconButton
              sx={{
                borderRadius: '3px',
              }}
            >
              <ClearIcon fontSize='medium' />
            </IconButton>
          </Box>
        </Box>
      </>
    );
  };

  return <>{form ? renderForm() : renderBtnAdd()}</>;
}
