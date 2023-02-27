import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { user } from './registrationForm';
import FixedContainer from './registrationForm';
import { useSelector } from 'react-redux';
import { getUserRegister } from '../store/selectors';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions';

export default function AccountMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUser = useSelector(getUserRegister);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openRegistationForm = () => {
    handleClose();
    FixedContainer();
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Your profille and settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Profile />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            padding: 2,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
            ACCOUNT
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Profile />
          <ListItemText
            primary={getUser.name + ' ' + getUser.surname}
            secondary={getUser.login}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText>Manage Account</ListItemText>
          <IconButton edge='end' aria-label='delete'>
            <ManageAccountsIcon />
          </IconButton>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>JIRA</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Personal settings</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/');
            dispatch(
              logoutUser({
                login: '',
                name: '',
                surname: '',
                isLogin: false,
              })
            );
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

function Profile() {
  const getUser = useSelector(getUserRegister);

  return getUser.isLogin ? (
    <Avatar>{(getUser.name[0] + getUser.surname[0]).toUpperCase()}</Avatar>
  ) : (
    <Avatar />
  );
}
