import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  addUser,
  getUser,
  getProjects,
  getColumn,
  getCard,
  addProject,
  addColumn,
  addCard,
  changeCard,
  changeColumn,
  changeProject,
  changeUser,
  deleteCard,
  deleteColumn,
  deleteProject,
} from './api';
import {
  bodyUserType,
  ProjectType,
  userType,
  ProjectColumnsType,
  ProjectCardType,
} from './types';
import {
  getFullDataUser,
  addProjectToUser,
  addColumnToUser,
  addCardToUser,
  changeProjectToUser,
  deleteProjectToUser,
  deleteColumnToUser,
  changeColumnToUser,
  deleteCardToUser,
} from './function-API';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
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

export default function FixedContainer() {
  const [fromDashboard, setFromDashboard] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorState, setErrorState] = React.useState(false);
  const [buttonEnter, setButtonEnter] = React.useState('Log in');
  const [buttonChange, setButtonChange] = React.useState('Create new Account');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newCustomer, setNewCustomer] = React.useState(false);
  const [validation, setValidation] = React.useState({
    email: '',
    isValid: false,
  });
  const [password, setPassword] = React.useState({
    password: '',
    isValid: false,
  });
  const [name, setName] = React.useState({
    name: '',
    isValid: false,
  });
  const [surname, setSurname] = React.useState({
    name: '',
    isValid: false,
  });

  const userCreate = async () => {
    if (!newCustomer) {
      setNewCustomer(true);
      setButtonEnter('Register');
      setButtonChange('Log in your account');
      let pr: ProjectType = user?.projects[0] as ProjectType;
      let col: ProjectColumnsType = pr?.columns[0] as ProjectColumnsType;
      let card: ProjectCardType = col?.cards[0] as ProjectCardType;
      console.log(await deleteCardToUser(user, pr, col, card));
    } else {
      setNewCustomer(false);
      setButtonEnter('Log in');
      setButtonChange('Create Account');
    }
    setErrorState(false);
  };

  const createErrorMesage = (text: string) => {
    return (
      <ListItem>
        <Typography
          id='modal-modal-title'
          variant='h6'
          sx={{
            display: { xs: 'flex', md: 'flex' },
            fontSize: 16,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'red',
            textDecoration: 'none',
          }}
        >
          {' '}
          {text}
        </Typography>
      </ListItem>
    );
  };

  const verificateUser = async () => {
    const userLogin = (
      document.getElementById('user-login') as HTMLInputElement
    ).value.trim();
    const userPassword = (
      document.getElementById('user-password') as HTMLInputElement
    ).value.trim();
    if (!newCustomer) {
      const users = await getUser(userLogin);
      console.log(users[0]);
      if (users?.length !== 0) {
        user = users[0];
        if (user?.password === userPassword) {
          user = await getFullDataUser(user);
          setErrorState(false);
          setFromDashboard(true);
          setOpen(false);
        } else {
          console.log('Password is wrong');
          setErrorState(true);
          text = 'Password is wrong';
          return;
        }
      } else {
        setErrorState(true);
        text = 'Login is wrong';
      }
    } else {
      const userName = (
        document.getElementById('user-name') as HTMLInputElement
      ).value;
      const userSurname = (
        document.getElementById('user-surname') as HTMLInputElement
      ).value;
      const newUser: bodyUserType = {
        login: userLogin,
        password: userPassword,
        name: userName,
        surname: userSurname,
        projects: [],
      };
      user = await addUser(newUser).then(res => {
        if (res._id === '') {
          setErrorState(true);
          text = 'This user was created before';
          return res;
        } else {
          setErrorState(false);
          setFromDashboard(true);
          setOpen(false);
          return res;
        }
      });
      console.log(user);
    }
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Get started
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{
          bgcolor: 'rgba(70, 99, 157, 0.5);',
        }}
      >
        <Box sx={style} component='form'>
          <Typography
            id='modal-modal-title'
            variant='h6'
            sx={{
              display: { xs: 'flex', md: 'flex' },
              fontSize: 16,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#2C67DA',
              textDecoration: 'none',
            }}
          >
            JIRA-CLONE
          </Typography>
          <List>
            <ListItem>
              <TextField
                id='user-login'
                label='Enter your email'
                placeholder='Your email here!'
                variant='outlined'
                margin='dense'
                type='email'
                color={validation.isValid ? 'success' : 'info'}
                onChange={event => {
                  const mailPattern =
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                  let valid = false;
                  if (event.target.value.match(mailPattern)) {
                    valid = true;
                    setErrorState(!valid);
                  }
                  setValidation(prevState => ({
                    ...prevState,
                    email: event.target.value,
                    isValid: valid,
                  }));
                }}
                error={!validation.isValid && validation.email.length > 0}
                helperText={
                  !validation.isValid && validation.email.length > 0
                    ? 'Write your email correctly'
                    : ''
                }
                sx={{
                  width: '40vw',
                  maxWidth: '400px',
                }}
                autoComplete='true'
                focused
                required
              />
            </ListItem>
            <ListItem>
              <TextField
                id='user-password'
                label='Enter your password'
                type='password'
                variant='outlined'
                margin='dense'
                sx={{
                  width: '100%',
                }}
                placeholder='Your password here!'
                onChange={event => {
                  const pattern = /[a-zA-Z0-9]{8,15}/;
                  const value = event.target.value.split(' ').join('');
                  let valid = false;
                  if (
                    value.match(pattern) &&
                    8 <= +value.length &&
                    +value.length <= 15
                  ) {
                    valid = true;
                  }
                  setPassword({
                    password: value,
                    isValid: valid,
                  });
                }}
                error={
                  !password.isValid &&
                  (password.password.length < 8 ||
                    password.password.length > 15) &&
                  password.password.length !== 0
                }
                color={password.isValid ? 'success' : 'info'}
                helperText={
                  !password.isValid && password.password.length > 0
                    ? 'Write your password correctly'
                    : ''
                }
                required
                focused
                autoComplete='true'
              />
            </ListItem>
            {errorState && createErrorMesage(text)}

            {newCustomer && (
              <>
                <ListItem>
                  <TextField
                    id='user-name'
                    type='text'
                    label='Enter your name'
                    variant='outlined'
                    margin='dense'
                    sx={{
                      width: '100%',
                    }}
                    placeholder='Your Name'
                    color={name.isValid ? 'success' : 'info'}
                    onChange={event => {
                      const name = event.target.value;
                      let valid = false;
                      if (name[0] === name[0].toUpperCase()) {
                        valid = true;
                      }
                      setName(prevState => ({
                        ...prevState,
                        name: event.target.value,
                        isValid: valid,
                      }));
                    }}
                    error={!name.isValid && name.name.length !== 0}
                    focused
                    required
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    type='text'
                    id='user-surname'
                    label='Enter your surname'
                    variant='outlined'
                    margin='dense'
                    sx={{
                      width: '100%',
                    }}
                    placeholder='Your Surname'
                    color={surname.isValid ? 'success' : 'info'}
                    onChange={event => {
                      const surname = event.target.value;
                      let valid = false;
                      if (surname[0] === surname[0].toUpperCase()) {
                        valid = true;
                      }
                      setSurname(prevState => ({
                        ...prevState,
                        name: event.target.value,
                        isValid: valid,
                      }));
                    }}
                    error={!surname.isValid && surname.name.length !== 0}
                    focused
                    required
                  />
                </ListItem>
              </>
            )}
            <ListItem>
              <Button
                type='submit'
                onClick={event => {
                  event.preventDefault();
                  // UN COOMIT IF U WANT THAT VALITDATION WORK
                  // if (validation.isValid && password.isValid) {
                  verificateUser();
                  // }
                }}
                id='button-enter'
                variant='contained'
                size='large'
                sx={{
                  width: '100%',
                }}
              >
                {buttonEnter}
              </Button>
            </ListItem>
            <ListItem>
              <Button
                onClick={userCreate}
                size='small'
                sx={{
                  width: '100%',
                }}
              >
                {buttonChange}
              </Button>
            </ListItem>
            <Divider />
            {/* <ListItem>
              <Link
                href='#'
                fontSize={10}
                underline='none'
                paddingTop={1.2}
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  color: '#112650',
                }}
              >
                Privacy Policy and User Notice
              </Link>
            </ListItem> */}
          </List>
        </Box>
      </Modal>
    </div>
  );
}
