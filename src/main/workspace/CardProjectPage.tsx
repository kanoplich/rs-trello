import React from "react";
import "./workspace.css"
import { Box } from "@mui/material/";
import { Link } from 'react-router-dom';
import { routes } from "../main";
import { useSelector } from "react-redux";
import { getProjects } from "../../store/selectors";
import { ProjectType } from '../../types';
import { ListCardProject } from "./ListCardProject";

export function CardProjectPage() {

  const projects = useSelector(getProjects);

  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h4 style={{color: "#172B4D"}}>Recent projects</h4>
        <Link to={routes[1].path} className="workspace__nav-link_view">View all projects</Link>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 2,
        position: "relative",
        paddingBottom: "10px",
        paddingTop: "2px",
        overflow: "auto",
      }}
      >

        {
          projects.projects.map((item: ProjectType) => <ListCardProject data={item} key={item.id}/>)
        }
        
      </Box>
    </>
  );
}