import React, { useState } from 'react';
import './footer.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

const githubTeam = [
  {
    link: 'https://github.com/kanoplich',
    name: 'Andrey',
    role: 'Teamlead',
  },
  {
    link: 'https://github.com/Hanna-ZAM',
    name: 'Anna',
    role: 'FE & BE',
  },
  {
    link: 'https://github.com/ChizhovMN',
    name: 'Maxim',
    role: 'FE & BE',
  },
];

function FooterBtn() {
  const [open, setOpen] = useState(false);
  return (
    <Stack spacing={2} direction='row'>
      <Button
        variant='text'
        color='inherit'
        className='github-btn'
        onClick={() => {
          const popUp = document.getElementById('footerPopUp');
          popUp?.classList.toggle('open');
          setOpen(!open);
        }}
      >
        <GitHubIcon className='github-icon' />
        Our Team!
      </Button>
    </Stack>
  );
}
function FooterTeamList() {
  return (
    <div className='footer-popup' id='footerPopUp'>
      <List
        aria-label='mailbox folders'
        sx={{
          width: '100%',
          maxWidth: 300,
          bgcolor: 'background.paper',
        }}
      >
        {githubTeam.map((item, index) => {
          return (
            <Link
              to={item.link}
              key={index}
              target='_blank'
              className='footer-link github-link'
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>{item.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    color: 'black',
                  }}
                  primary={item.name + ' - ' + item.role}
                />
              </ListItem>
              <Divider variant='inset' component='li' />
            </Link>
          );
        })}
      </List>
    </div>
  );
}

export function Footer() {
  return (
    <footer className='footer'>
      <FooterTeamList />
      <div className='footer-wrapper'>
        <div className='footer-team'>
          <FooterBtn />
        </div>
        <div className='footer-year'>©2023</div>
        <div
          style={{
            marginLeft: 'auto',
          }}
        >
          <Button variant='text' color='inherit'>
            <a
              href='https://rs.school/'
              target='_blank'
              rel='noreferrer'
              className='footer-link rss-link'
            >
              RS-SCHOOL
            </a>
          </Button>
        </div>
        <Typography
          className=' footer-link'
          variant='h6'
          noWrap
          component='a'
          target='_blank'
          href='https://www.atlassian.com/software/jira/features/scrum-boards'
          sx={{
            position: 'absolute',
            right: '0',
            top: '-1rem',
            color: 'white',
            background: 'linear-gradient(#1976d2 55%, white 45%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ORIGINAL JIRA
        </Typography>
      </div>
    </footer>
  );
}
