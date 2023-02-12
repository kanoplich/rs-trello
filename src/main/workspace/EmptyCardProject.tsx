import React from "react";
import "./workspace.css"
import { Box, Button, } from "@mui/material/";
import { Link } from 'react-router-dom';
import { routes } from "../main";


export function EmptyCardProject() {
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}>
      <p className="empty-card__desc">You have no recently viewed projects</p>
      <Link to={routes[1].path} className="workspace__nav-link_btn">
        <Button size="medium" variant="contained">
          <span className="workspace__first-letter">View all projects</span>
        </Button>
      </Link>
    </Box>
  );
}