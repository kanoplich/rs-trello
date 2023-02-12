import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StarCheckBox from './starCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, getProjectSearchResults } from '../../store/selectors';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import {
  checkAllProjects,
  checkProject,
  deleteProject,
} from '../../store/actions';

export default function ProjectsTable() {
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const checkedProjects = useSelector(getProjectSearchResults);
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{ maxHeight: '70vh' }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          size='small'
          aria-label='a dense table'
        >
          <TableHead>
            <TableRow>
              <TableCell
                align='center'
                sx={{ width: '1rem' }}
                onClick={() => dispatch(checkAllProjects(true))}
              >
                <StarCheckBox check={projects.checkAllProjects} />
              </TableCell>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Key</TableCell>
              <TableCell align='center'>Type</TableCell>
              <TableCell align='center'>Lead</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ height: '80%' }}>
            {projects.projects.length > 0 &&
              checkedProjects.map(row => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className='project_item'
                >
                  <TableCell onClick={() => dispatch(checkProject(row.id))}>
                    {' '}
                    <StarCheckBox check={row.checked} />
                  </TableCell>
                  <TableCell component='th' scope='row' align='center'>
                    <Link to={`${row.name}/boards`}>{row.name}</Link>
                  </TableCell>
                  <TableCell align='center'>{row.key}</TableCell>
                  <TableCell align='center'>{row.type}</TableCell>
                  <TableCell align='center'>{row.lead}</TableCell>
                  <TableCell
                    aria-label='delete'
                    sx={{ width: '1rem' }}
                    onClick={() => dispatch(deleteProject(row.id))}
                  >
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
