import React from 'react';
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
import { useDispatch } from 'react-redux';
import { setActiveProjectId } from '../../store/actions';
const icon: string = require('../../assets/icon/avatar_5.svg').default;

interface CardProjectProps {
  data: ProjectType;
}

export function ListCardProject({ data }: CardProjectProps) {

  const dispatch = useDispatch();

  const getPassedIssue = () => {
    let count = 0;
    data.columns.filter(item => {
      if (item.title === 'DONE') {
        count += item.cards.length;
      }
    })
    return count;
  }

  const getActiveIssue = () => {
    let count = 0;
    data.columns.filter(item => {
      if (item.title !== 'DONE') {
        count += item.cards.length;
      }
    })
    return count;
  }

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
            <img className='workspace__icon' src={icon} alt='avatar' />
          </Box>
          <Box>
            <p className='workspace__team_title'>{data.name}</p>
            <p className='workspace__team_desc'>{data.type}</p>
          </Box>
        </Box>
        <p className='workspace__links'>QUICK LINKS</p>
        <Box>
          <span className='workspace__links_link'>
            <p className='workspace__links_issues'>My open issues</p>
            <div className='workspace__links_count'>{getActiveIssue()}</div>
          </span>
        </Box>
        <Box>
          <span className='workspace__links_link'>
            <p className='workspace__links_issues'>Done issues</p>
            <div className='workspace__links_count'>{getPassedIssue()}</div>
          </span>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Link
          onClick={() => dispatch(setActiveProjectId(data.id))}
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
