import React, { Component } from 'react';
import './workspace.css';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
} from '@mui/material/';
import { Link } from 'react-router-dom';
import { ProjectType } from '../../types';

// import ReactLogo from '../../assets/icon/avatar_1.svg';
interface CardProjectProps {
  data: ProjectType;
}

export function ListCardProject({ data }: CardProjectProps) {
  // const icon: string = require(data.logo);
  return (
    <Card
      sx={{
        height: 188,
        width: 240,
        minWidth: 240,
        borderRadius: 2,
        borderLeft: 20,
        borderColor: '#FFBDAD',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Box>
            {/* <img className='workspace__icon' src={} alt='avatar' /> */}
            {/* <SvgIcon component={component} viewBox='0 0 384 512' /> */}
            {/* <ReactSVG className='workspace__icon' src={data.logo} /> */}
          </Box>
          <Box>
            <p className='workspace__team_title'>{data.name}</p>
            <p className='workspace__team_desc'>{data.type}</p>
          </Box>
        </Box>
        <p className='workspace__links'>QUICK LINKS</p>
        <Box>
          <Link className='workspace__links_link' to='#'>
            <p className='workspace__links_issues'>My open issues</p>
            <div className='workspace__links_count'></div>
          </Link>
        </Box>
        <Box>
          <Link className='workspace__links_link' to='#'>
            <p className='workspace__links_issues'>Done issues</p>
          </Link>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Link
          to={`/projects/${data.name}/board`}
          className='workspace__nav-link'
        >
          <Button
            size='small'
            variant='text'
            color='inherit'
            style={{
              textTransform: 'lowercase',
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            board
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
