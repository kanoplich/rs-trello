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
import { addUser, getUser, getProjects, getColumn, getCard} from './api';
import { bodyUserType, userType } from './types';
import * as qs from 'qs'



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  maxWidth:'500px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: 'background.paper',
  borderRadius: '0.5ch',
  boxShadow: 24,
  p: 4,
};

export let user:userType;

function createField ( ) {
return  <>
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
  const [open, setOpen] = React.useState(false);
  const [buttonEnter, setButtonEnter] =React.useState('Log in');
  const [buttonChange, setButtonChange] =React.useState('Create new Account');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newCustomer, setNewCustomer] = React.useState(false);

  const userCreate = async () => {
    if (!newCustomer) {
      setNewCustomer(true);
      setButtonEnter('Register');
      setButtonChange('Log in your account')
      const u= {
        projects: ['63f1005a8a3531cf4a287b39'],
        _id: "63ea5e95a971ed1fa800e8e8",
        login: "login15",
        password: "password3",
        name: "name3",
        surname: "surname3",
        __v: 0,
    };
      const project = await getProjects(u.projects[0])/*.then(res=>
        res= getColumn(res.column[0])
      );*/
      console.log(project)
      const column = await getColumn(project.columns[0])
      console.log(column)
      const card = await getCard(column.cards[0])
      console.log(card)
    } else {
      setNewCustomer(false);
      setButtonEnter('Log in');
      setButtonChange('Create Account')
    }
  }

  const verificateUser = async () => {
    const userLogin =(document.getElementById('user-login') as HTMLInputElement).value.trim();
    const userPassword = (document.getElementById('user-password') as HTMLInputElement).value.trim();
    if (!newCustomer) {
       user = (await getUser(userLogin))[0];
       if (user.password===userPassword){
        console.log(user);
        setOpen(false);
       }

    } else {
      const userName = (document.getElementById('user-name') as HTMLInputElement).value;
      const userSurname = (document.getElementById('user-surname') as HTMLInputElement).value;
      const ass: bodyUserType= { 
        login: userLogin,
        password: userPassword,
      name: userName,
      surname: userSurname,
      projects:[],
     }
    user= await addUser(ass);
      setOpen(false);
    }
  }

  

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Get started</Button>
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
                        fontSize:16,
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
                         sx={{ 
                          width: '40vw', 
                          maxWidth:'400px'
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
                      textAlign:'center', 
                      color: "#112650"}}
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

