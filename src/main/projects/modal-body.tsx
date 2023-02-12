import { Box, TextField, Button } from '@mui/material';
import { useDeferredValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createKey } from '../../helperFunctions';
import {
  checkProjectColumns,
  checkProjectModal,
  checkProjectModalFields,
  checkProjectName,
  checkProjectTeamLead,
  checkProjectType,
  refreshProjectModal,
} from '../../store/actions';
import { getProjects, selectProjectModal } from '../../store/selectors';

export default function ModalBody() {
  const dispatch = useDispatch();
  const modal = useSelector(selectProjectModal);
  const projects = useSelector(getProjects);
  const deffered = useDeferredValue(modal);
  return (
    <Box className='modal_body' component='form'>
      <TextField
        label='Project Name'
        size='small'
        id='nameField'
        sx={{ minWidth: '100%', maxWidth: '100%' }}
        helperText='Please name your project'
        onChange={event => {
          if (event) dispatch(checkProjectName(event.target.value));
        }}
      />
      <TextField
        label='Type'
        helperText='Please write your type'
        id='typeField'
        size='small'
        sx={{ minWidth: '100%', maxWidth: '100%' }}
        onChange={event => {
          if (event) dispatch(checkProjectType(event.target.value));
        }}
      />
      <TextField
        label='Teamlead'
        size='small'
        id='leadField'
        helperText='Please choose your teamlead'
        sx={{ width: '100%', maxWidth: '100%' }}
        onChange={event => {
          if (event) dispatch(checkProjectTeamLead(event.target.value));
        }}
      />
      <div className='modal_add_col'>
        <TextField
          label='Add Columns'
          id='columnField'
          size='small'
          sx={{ width: '100%', maxWidth: '100%' }}
          onChange={event => {
            if (event) dispatch(checkProjectColumns(event.target.value));
          }}
        />
        <Button variant='outlined'>ADD</Button>
      </div>

      <div>{<ColumnsProjectModal />}</div>
      <Button
        variant='contained'
        onClick={() => {
          let id = 1;
          if (projects.projects.length) {
            id = projects.projects[projects.projects.length - 1].id + 1;
          }
          dispatch(
            checkProjectModalFields({
              name: modal.inputs.projectName || modal.defaultProjectName,
              key: createKey(),
              lead: modal.inputs.teamLead || 'Default lead',
              type: modal.inputs.typeField || modal.defaultType,
              id: id,
              checked: false,
            })
          );
          dispatch(checkProjectModal(false));
          dispatch(
            refreshProjectModal({
              columnName: '',
              projectName: '',
              typeField: '',
              teamLead: '',
            })
          );
        }}
      >
        Create
      </Button>
    </Box>
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
