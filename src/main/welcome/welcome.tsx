import React from "react";
import './welcome.css';
import { Container, Box } from "@mui/material/";
import FixedContainer from "../../components/registrationForm";


const image: string = require("../../assets/image/JiraScrum.svg").default;

export default function WelcomePage() {

  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "60vh",
              gap: "5%",
            }}
          >
          <Box>
            <Box sx={{
              width: "100%",
            }}>
              <h1 className="welcome__title">Team collaboration and incremental delivery starts on the scrum board</h1>
              <p className="welcome__desc">The scrum framework enables software teams to manage complex projects by creating a culture of collaboration. The Jira scrum board is the tool that unites teams around a single goal and promotes iterative, incremental delivery.</p>
              <FixedContainer />
            </Box>
          </Box>
          <Box display={{xs: "none", sm: 'block'}} sx={{
              width: "100%",
            }}>
            <img className="welcome__image" src={image} alt="Welcome" />
          </Box>
        </Box>
      </Container>
    </>
  );
}
