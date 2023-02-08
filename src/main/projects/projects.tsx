import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import SearchField from "../../components/searchField";
import "./projects.css";
import ProjectsTable from "./tableProjects";
import CreateBtn, { openCreateProject } from "../../components/createProjectBtn";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Projects() {
  return (
    <>
      <div className="projects_main">
        <div className="projects_header">
          <h2>Projects</h2>
          <div className="project_btn">
            <SearchField/>
            <CreateBtn text={"Create"} />
          </div>
        </div> 
        <ProjectsTable/>
        <></>
        <Link to=":name/board">PAGE OF ONE PROJECT WITH DETAILS</Link>
        <div> CREATE YOUR FIRST PROJECT!</div>
      </div>
      <CreateProjectModal/>
      <Outlet />
    </>
  );
}


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CreateProjectModal() {
  const [open, setOpen] = React.useState(openCreateProject);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {},[openCreateProject])
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}