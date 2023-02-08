import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StarCheckBox from './starCheckbox';



const tableHeader = ["Name","Key","Type","Lead"];

export default function ProjectsTable() {
   const [rows,setRows] = React.useState([]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{width:"1rem"}}><StarCheckBox/></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Key</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Lead</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 && rows.map((row) => (
            // <TableRow
            //   key={row.name}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            // >
            //   <TableCell component="th" scope="row">
            //     {row.name}
            //   </TableCell>
            //   <TableCell align="right">{row.calories}</TableCell>
            //   <TableCell align="right">{row.fat}</TableCell>
            //   <TableCell align="right">{row.carbs}</TableCell>
            //   <TableCell align="right">{row.protein}</TableCell>
            // </TableRow>
            <div>false</div>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




