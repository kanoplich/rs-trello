import { Box, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createKey } from '../../helperFunctions';
import {
  checkProjectModal,
  checkProjectModalFields,
} from '../../store/actions';
import { getProjects, selectProjectModal } from '../../store/selectors';

export default function ModalBody() {
  const dispatch = useDispatch();
  const modal = useSelector(selectProjectModal);
  const projects = useSelector(getProjects);
  return (
    <form>
      <Box className='modal_body'>
        <TextField
          label='Project Name'
          size='small'
          id='nameField'
          required
          sx={{ minWidth: '100%', maxWidth: '100%' }}
          helperText='Please name your project'
        />
        <TextField
          label='Type'
          helperText='Please write your type'
          id='typeField'
          size='small'
          sx={{ minWidth: '100%', maxWidth: '100%' }}
        />
        <TextField
          label='Teamlead'
          size='small'
          id='leadField'
          helperText='Please choose your teamlead'
          required
          sx={{ width: '100%', maxWidth: '100%' }}
        />
        <div className='modal_add_col'>
          <TextField
            label='Add Columns'
            id='columnField'
            size='small'
            sx={{ width: '100%', maxWidth: '100%' }}
          />
          <Button variant='outlined'>ADD</Button>
        </div>

        <div>{<ColumnsProjectModal />}</div>
        <Button
          variant='contained'
          onClick={() => {
            let id = 1;
            if (projects.length) {
              id = projects[projects.length - 1].id + 1;
            }
            dispatch(
              checkProjectModalFields({
                name: modal.defaultProjectName,
                key: createKey(),
                lead: 'DEFAULT LEAD',
                type: modal.defaultType,
                id: id,
              })
            );
            dispatch(checkProjectModal(false));
          }}
        >
          Create
        </Button>
      </Box>
    </form>
  );
}

export function ColumnsProjectModal() {
  const columns = useSelector(selectProjectModal);
  return (
    <div>
      {columns.columns.map(item => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
