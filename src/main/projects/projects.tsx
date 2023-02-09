import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchField from '../../components/searchField';
import './projects.css';
import ProjectsTable from './tableProjects';
import CreateBtn from '../../components/createProjectBtn';
import { useSelector } from 'react-redux';
import { getProjects } from '../../store/selectors';

export default function Projects() {
  const projects = useSelector(getProjects);
  return (
    <>
      <div className='projects_main'>
        <div className='projects_header'>
          <h2>Projects</h2>
          <div className='project_btn'>
            <SearchField />
            <CreateBtn text={'Create'} />
          </div>
        </div>
        <ProjectsTable />
        <></>
        {projects.length === 0 && (
          <div className='first_project'> CREATE YOUR FIRST PROJECT!</div>
        )}
      </div>
      <Outlet />
    </>
  );
}
