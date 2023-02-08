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


function createField () {
return  <ListItem>
<TextField id="login-password" 
           label="Enter your password" 
           variant="outlined" 
           margin="dense" 
           sx={{ 
            width: '100%' 
          }} 
/>
</ListItem>
}


export default function FixedContainer() {
  const [open, setOpen] = React.useState(false);
  const [buttonEnter, setButtonEnter] =React.useState('Log in');
  const [buttonChange, setButtonChange] =React.useState('Create new Account');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newCustomer, setNewCustomer] = React.useState(false);
  const userCreate = () => {
    if (!newCustomer) {
      setNewCustomer(true);
      setButtonEnter('Register');
      setButtonChange('Log in your account')
    } else {
      setNewCustomer(false);
      setButtonEnter('Log in');
      setButtonChange('Create Account')
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
              <TextField id="login-email" 
                         label="Enter your email" 
                         variant="outlined" 
                         margin="dense" 
                         sx={{ 
                          width: '40vw', 
                          maxWidth:'400px'
                        }} 
              />
            </ListItem>
            {(!newCustomer) && createField()}
            <ListItem>
            <Button variant="contained" 
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

/*export default function FixedContainer() {

 return (
    <React.Fragment>
   fontSize={14}  
                    underline="none" 
                    paddingTop={1.2} 
                    sx={{ 
                      width: '100%', 
                      textAlign:'center',  
                      mb:1,  
                    color: "#2C67DA" }}
      <Container fixed>
        <Box sx={{ 
          bgcolor: "#6E81A5", 
          height: '100vh', 
          width:'100vw', 
          position:'fixed', 
          top:'0', 
          left:'0', 
          opacity:'0.7' 
          }} 
        />
        <Paper elevation={3} 
               classList="form">
          <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              JIRA-CLONE
          </Typography>
        </Paper>
      </Container>
    </React.Fragment>
  );
}*/