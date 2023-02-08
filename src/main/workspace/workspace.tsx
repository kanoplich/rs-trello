import React, { Component } from "react";
import "./workspace.css"
import { Container, Box, Card, CardContent, CardActions, Button } from "@mui/material/";
import { Link } from 'react-router-dom';
import { routes } from "../main";

const icon: string = require("../../assets/icon/avatar_5.svg").default;

function CardProject() {
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
            <img className="workspace__icon" src={icon} alt="Welcome" />
          </Box>
          <Box>
            <p className="workspace__team_title">Team name</p>
            <p className="workspace__team_desc" >Team-managed software</p>
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
      <div className="workspace__border"></div>
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

function EmptyCardProject() {
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

function TitleCardProject() {
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

        <CardProject />
        <CardProject />
        <CardProject />
        <CardProject />
        <CardProject />


      </Box>
    </>
  );
}

export default function WorkspacePage() {
  return (
    <>
      <section className="workspace-page">
        {/* <FixedContainer /> */}
        <Container maxWidth="xl">
          <h1 className="workspace__title">Workspace</h1>

          {false ? <EmptyCardProject /> : <TitleCardProject />}

        </Container>
      </section>
    </>
  );
}
