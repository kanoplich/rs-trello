import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StarCheckBox from './starCheckbox';
import { useSelector } from 'react-redux';
import { getProjects } from '../../store/selectors';
import { Link } from 'react-router-dom';

export default function ProjectsTable() {
  const projects = useSelector(getProjects);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{ width: '1rem' }}>
              <StarCheckBox />
            </TableCell>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='center'>Key</TableCell>
            <TableCell align='center'>Type</TableCell>
            <TableCell align='center'>Lead</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.length > 0 &&
            projects.map(row => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className='project_item'
              >
                <TableCell>
                  {' '}
                  <StarCheckBox />
                </TableCell>
                <TableCell component='th' scope='row' align='center'>
                  <Link to={`${row.name}/boards`}>{row.name}</Link>
                </TableCell>
                <TableCell align='center'>{row.key}</TableCell>
                <TableCell align='center'>{row.type}</TableCell>
                <TableCell align='center'>{row.lead}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
