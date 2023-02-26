import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  addUser, getUser, getProjects, getColumn, getCard,
  addProject, addColumn, addCard, changeCard, changeColumn,
  changeProject, changeUser, deleteCard, deleteColumn, deleteProject
} from './api';
import { bodyUserType, ProjectType, userType, ProjectColumnsType, ProjectCardType } from './types';
import {
  getFullDataUser, addProjectToUser, addColumnToUser, addCardToUser,
  changeProjectToUser, deleteProjectToUser, deleteColumnToUser, changeColumnToUser, deleteCardToUser
} from './function-API';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: 'background.paper',
  borderRadius: '0.5ch',
  boxShadow: 24,
  p: 4,
};

let text: string = '';
export let user: userType;

function createField() {
  return <>
    <ListItem>
      <TextField id="user-name"
        label="Enter your name"
        variant="outlined"
        margin="dense"
        sx={{
          width: '100%'
        }}
      />
    </ListItem>
    <ListItem>
      <TextField id="user-surname"
        label="Enter your surname"
        variant="outlined"
        margin="dense"
        sx={{
          width: '100%'
        }}
      />
    </ListItem>
  </>
}


export default function FixedContainer() {
  const [fromDashboard, setFromDashboard] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorState, setErrorState] = React.useState(false);
  const [buttonEnter, setButtonEnter] = React.useState('Log in');
  const [buttonChange, setButtonChange] = React.useState('Create new Account');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newCustomer, setNewCustomer] = React.useState(false);

  const userCreate = async () => {
    debugger
    if (!newCustomer) {
      setNewCustomer(true);
      setButtonEnter('Register');
      setButtonChange('Log in your account');
      let pr: ProjectType = (user.projects[0] as ProjectType);
      let col: ProjectColumnsType = (pr.columns[0] as ProjectColumnsType);
      let card: ProjectCardType = (col.cards[0] as ProjectCardType)
      /* pr.name='ffff';*/
      /*let columna:ProjectColumnsType=(pr.columns[0] as ProjectColumnsType);*/
      await deleteCardToUser(user, pr, col, card);

    } else {
      setNewCustomer(false);
      setButtonEnter('Log in');
      setButtonChange('Create Account');
    }
    setErrorState(false);
  }

  const deleteError = () => {
    setErrorState(false);
  }

  const createErrorMesage = (text: string) => {
    return <ListItem>
      <Typography id="modal-modal-title"
        variant="h6"
        sx={{
          display: { xs: "flex", md: "flex" },
          fontSize: 16,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "red",
          textDecoration: "none",
        }}
      > {text}
      </Typography>
    </ListItem>

  }

  const verificateUser = async () => {
    const userLogin = (document.getElementById('user-login') as HTMLInputElement).value.trim();
    const userPassword = (document.getElementById('user-password') as HTMLInputElement).value.trim();
    if (!newCustomer) {
      const users = (await getUser(userLogin));
      console.log(users[0]);
      if (users.length !== 0) {
        user = users[0];
        if (user.password === userPassword) {
          user = await getFullDataUser(user);
          setErrorState(false);
          setFromDashboard(true);
          setOpen(false);
        } else {
          console.log('Password is wrong');
          setErrorState(true);
          text = 'Password is wrong';
          return
        }
      } else {
        setErrorState(true);
        text = 'Login is wrong';
      }
    } else {
      const userName = (document.getElementById('user-name') as HTMLInputElement).value;
      const userSurname = (document.getElementById('user-surname') as HTMLInputElement).value;
      const newUser: bodyUserType = {
        login: userLogin,
        password: userPassword,
        name: userName,
        surname: userSurname,
        projects: [],
      }
      user = await addUser(newUser).then(res => {
        if (res._id === '') {
          setErrorState(true);
          text = 'This user was created before'
          return res
        } else {
          setErrorState(false);
          setFromDashboard(true);
          setOpen(false);
          return res
        }
      })
      console.log(user);

    }
  }


  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Get started

      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          bgcolor: "rgba(70, 99, 157, 0.5);",
        }}
      >
        <Box sx={style}>

          <Typography id="modal-modal-title"
            variant="h6"
            sx={{
              display: { xs: "flex", md: "flex" },
              fontSize: 16,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#2C67DA",
              textDecoration: "none",
            }}
          >
            JIRA-CLONE
          </Typography>
          <List >
            <ListItem>
              <TextField id="user-login"
                label="Enter your email"
                variant="outlined"
                margin="dense"
                onInput={deleteError}
                sx={{
                  width: '80vw',
                  maxWidth: '400px'
                }}
              />
            </ListItem>
            <ListItem>
              <TextField id="user-password"
                label="Enter your password"
                variant="outlined"
                margin="dense"
                sx={{
                  width: '100%'
                }}
              />
            </ListItem>
            {(errorState) && createErrorMesage(text)}
            {(newCustomer) && createField()}
            <ListItem>
              <Button onClick={verificateUser}
                id="button-enter"
                variant="contained"
                size="large"
                sx={{
                  width: '100%'
                }}
              >

                {buttonEnter}
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={userCreate}
                size="small"
                sx={{
                  width: '100%'
                }}
              >
                {buttonChange}
              </Button>
            </ListItem>
            <Divider />
            <ListItem>
              <Link href="#"
                fontSize={10}
                underline="none"
                paddingTop={1.2}
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  color: "#112650"
                }}
              >
                Privacy Policy and User Notice
              </Link>
            </ListItem>
          </List>
        </Box>
      </Modal>
    </div>
  );
}

