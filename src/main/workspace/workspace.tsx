import React, { Component } from "react";
import "./workspace.css"
import FixedContainer from "../../components/registrationForm";
import { Container, Box, Card, CardContent, CardActions, Button } from "@mui/material/";

const icon: string = require("../../assets/icon/avatar_5.svg").default;

function CardProject() {
  return (
    <Card sx={{ 
      height: 188,
      width: 240,
      marginTop: "100px",
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
        <a className="workspace__links_link" href="#">
          <p className="workspace__links_issues">My open issues</p>
          <div className="workspace__links_count"></div>
        </a>
      </Box>
      <Box>
        <a className="workspace__links_link" href="#">
          <p className="workspace__links_issues">Done issues</p>
        </a>
      </Box>
    </CardContent>
    <CardActions>
        <Button size="small" variant="text" color="inherit" style={{textTransform: "lowercase"}}>board</Button>
      </CardActions>
  </Card>
  )
}

export default function WorkspacePage() {
  return (
    <>
      <section className="workspace-page">
      <FixedContainer />
        <Container maxWidth="xl">
          <h1>Projects</h1>
          <Box sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 2,
                  position: "relative",
              }}
          >
            <CardProject />
            <CardProject />
            <CardProject />
            <CardProject />
          </Box>
        </Container>
      </section>
    </>
  );
}
