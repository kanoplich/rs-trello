import * as React from 'react';
import { Link } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import { Box, Typography, SvgIcon } from '@mui/material/';
import { useSelector } from "react-redux";
import { selectProjectModal } from "../../../store/selectors";


type DrawerProps = {
  boardOpen: boolean,
  closeBoard: () => void,
}

const avatar: string = require("../../../assets/icon/avatar_5.svg").default;

export function ProjectAside(props: DrawerProps) {
  const { boardOpen, closeBoard } = props;
  const modals = useSelector(selectProjectModal);

  return (
    <Drawer
      anchor="left"
      open={boardOpen}
      onClose={closeBoard}
    >
      <Box sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "220px",
        marginBottom: "50px",
      }}>
        <Box>
          <img className="board__icon" src={avatar} alt="avatar" />
        </Box>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: 14,
              mx: "10px",
            }}>
            {modals.inputs.projectName.trim() ? modals.inputs.projectName : modals.defaultProjectName}
          </Typography>
          <Typography
            variant="inherit"
            sx={{
              fontSize: 12,
              mx: "10px",
            }}>Software project</Typography>
        </Box>
      </Box>
      {/* <Box>
        <Link className='board__link' to="projects/:name/*">
          <SvgIcon>
            <path d="M6 2h10a3 3 0 010 6H6a3 3 0 110-6zm0 2a1 1 0 100 2h10a1 1 0 000-2H6zm4 5h8a3 3 0 010 6h-8a3 3 0 010-6zm0 2a1 1 0 000 2h8a1 1 0 000-2h-8zm-4 5h6a3 3 0 010 6H6a3 3 0 010-6zm0 2a1 1 0 000 2h6a1 1 0 000-2H6z" fill="currentColor" fillRule="evenodd"></path>
          </SvgIcon>
          <Typography
            variant="h4"
            sx={{
              fontSize: 16,
              mx: "30px",
            }}>Roadmap</Typography>
        </Link>
      </Box> */}
      <Box>
        <Link className='board__link' to={'#'} onClick={closeBoard}>
          <SvgIcon>
            <path d="M4 18h16.008C20 18 20 6 20 6H3.992C4 6 4 18 4 18zM2 5.994C2 4.893 2.898 4 3.99 4h16.02C21.108 4 22 4.895 22 5.994v12.012A1.997 1.997 0 0120.01 20H3.99A1.994 1.994 0 012 18.006V5.994z"></path>
            <path d="M8 6v12h2V6zm6 0v12h2V6z"></path>
          </SvgIcon>
          <Typography
            variant="h4"
            sx={{
              fontSize: 16,
              mx: "30px",
            }}>Board</Typography>
        </Link>
      </Box>
    </Drawer>
  );
}