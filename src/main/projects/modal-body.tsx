import { Box, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createKey } from '../../helperFunctions';
import {
  addColumnForProjectInModal,
  checkProjectColumns,
  checkProjectModal,
  checkProjectModalFields,
  checkProjectName,
  checkProjectTeamLead,
  checkProjectType,
  deleteColumnForProjectImModal,
  refreshColumnsInModal,
  refreshProjectModal,
} from '../../store/actions';
import {
  getColumnNameInModal,
  getProjects,
  selectProjectModal,
} from '../../store/selectors';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';

export default function ModalBody() {
  const dispatch = useDispatch();
  const modal = useSelector(selectProjectModal);
  const projects = useSelector(getProjects);
  const column = useSelector(getColumnNameInModal);
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
        <Button
          variant='outlined'
          onClick={() => dispatch(addColumnForProjectInModal(column))}
        >
          ADD
        </Button>
      </div>

      <div className='modal_project_columns'>{<ColumnsProjectModal />}</div>
      <Button
        variant='contained'
        onClick={() => {
          let id = 1;
          if (projects.projects.length) {
            id = projects.projects[projects.projects.length - 1].id + 1;
          }
          //TODO:MADE TYPE FOR COLUMNS
          dispatch(
            checkProjectModalFields({
              name: modal.inputs.projectName || modal.defaultProjectName,
              key: createKey(),
              lead: modal.inputs.teamLead || 'Default lead',
              type: modal.inputs.typeField || modal.defaultType,
              id: id,
              checked: false,
              columns: { ...modal.columns },
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
          dispatch(refreshColumnsInModal(modal.defaultColumns));
        }}
      >
        Create
      </Button>
    </Box>
  );
}

export function ColumnsProjectModal() {
  const dispatch = useDispatch();
  const columns = useSelector(selectProjectModal);
  return (
    <>
      {columns.columns.map(item => (
        <div key={item} className='modal_column_item'>
          <div>{item}</div>
          <IconButton
            onClick={() => dispatch(deleteColumnForProjectImModal(item))}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </>
  );
}
