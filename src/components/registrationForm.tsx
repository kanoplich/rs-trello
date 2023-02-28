import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
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
  ProjectTypeNew,
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
import { useDispatch } from 'react-redux';
import { loadProjects, loginUser } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import { adapterFromServer } from './adapter';

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

export let userProjects:ProjectTypeNew[]=[];
let text: string = '';
const INITIAL_USER={_id:'', login:'', password:'', name:'', surname:'', projects:[]};
export let user: userType=INITIAL_USER;
export default function FixedContainer() {
  const [preloaderStatus,setPreloaderStatus] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
     } else {
      setNewCustomer(false);
      setButtonEnter('Log in');
      setButtonChange('Create Account');
    }
    setErrorState(false);
  };

  const createPreloader = () => {
    return <ListItem>
             <Box sx={{ display: 'flex',
                        justifyContent:'center',
                        alignItems: 'center' }}
             >
              <CircularProgress />
              <Typography id="preloader-text"
                          variant="h6"
                          sx={{
                            fontSize: '14px',
                            width: '100%',
                            textAlign: 'center',
                            color: "#112650"
                          }}
              >Waiting server answer...
              </Typography>
             </Box>
           </ListItem>
  }

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
    user=INITIAL_USER;
    const userLogin = (
      document.getElementById('user-login') as HTMLInputElement
    ).value.trim();
    const userPassword = (
      document.getElementById('user-password') as HTMLInputElement
    ).value.trim();
    setPreloaderStatus(true);
    if (!newCustomer) {
      const users = await getUser(userLogin);
      setPreloaderStatus(false);
      if (users?.length !== 0) {
        if (users[0]?.password === userPassword) {
          user = await getFullDataUser(users[0]);
         
          /*setErrorState(false);
          setFromDashboard(true);
          setOpen(false);
          navigate('/workspace');
          dispatch(
            loginUser({
              login: user.login,
              name: user.name,
              surname: user.surname,
              isLogin: true,
            })
          );*/
          // OUR TYPES ARE NOT
          // dispatch(loadProjects(user.projects));
        } else {
          console.log('Password is wrong');
          setErrorState(true);
          text = 'Password is wrong';
          return;
        }
      } else {
        text = 'Login is wrong';
        setErrorState(true);
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
      /*navigate('/workspace');
      dispatch(
        loginUser({
          login: newUser.login,
          name: newUser.name,
          surname: newUser.surname,
          isLogin: true,
        })
      );*/
      // OUR TYPES ARE NOT
      // dispatch(loadProjects(newUser.projects));
      user = await addUser(newUser).then(res => {
        setPreloaderStatus(false);
        if (res.login === '') {
        return res;
        } else {
          return res;
        }
      });
      text = 'This user was created before';
    }
    /*setPreloaderStatus(false);*/
    if ((user.login!=='')) {
      setErrorState(false);
            setFromDashboard(true);
            setOpen(false);
            navigate('/workspace');
            dispatch(
              loginUser({
                login: user.login,
                name: user.name,
                surname: user.surname,
                isLogin: true,
              })
            );
    } else if (user.login === ''){
    setErrorState(true);
    }
    console.log(user);

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
          <List
            style={{
              width: '100%',
            }}
          >
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
                  width: '100%',
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
            {(preloaderStatus) && createPreloader()} 
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
                  if (validation.isValid && password.isValid) {
                    verificateUser();
                  }
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
          </List>
        </Box>
      </Modal>
    </div>
  );
}