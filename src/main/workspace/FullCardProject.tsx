import React from "react";
import "./workspace.css"
import { Box, Card, CardContent, CardActions, Button, Divider } from "@mui/material/";
import { Link } from 'react-router-dom';
import { ProjectType } from '../../types';

interface CardProjectProps {
  data: ProjectType
}

const icon: string = require("../../assets/icon/avatar_5.svg").default;

export function FullCardProject({data}: CardProjectProps) {

  return (
    <Card sx={{
      height: 188,
      width: 240,
      minWidth: 240,
      borderRadius: 2,
      borderLeft: 20,
      borderColor: "#FFBDAD",
    }}>
      <CardContent>
        <Box sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        >
          <Box>
            <img className="workspace__icon" src={icon} alt="avatar" />
          </Box>
          <Box>
            <p className="workspace__team_title">{data.name}</p>
            <p className="workspace__team_desc" >{data.type}</p>
          </Box>
        </Box>
        <p className="workspace__links">QUICK LINKS</p>
        <Box>
          <Link className="workspace__links_link" to="#">
            <p className="workspace__links_issues">My open issues</p>
            <div className="workspace__links_count"></div>
          </Link>
        </Box>
        <Box>
          <Link className="workspace__links_link" to="#">
            <p className="workspace__links_issues">Done issues</p>
          </Link>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Link to="/projects/:name/board" className="workspace__nav-link">
          <Button size="small" variant="text" color="inherit" style={{
            textTransform: "lowercase",
            paddingTop: 0,
            paddingBottom: 0,
          }}
          >board</Button>
        </Link>
      </CardActions>
    </Card>
  )
}