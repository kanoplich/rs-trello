import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchField from '../../components/searchField';
import './projects.css';
import ProjectsTable from './tableProjects';
import CreateBtn from '../../components/createProjectBtn';
import { useSelector } from 'react-redux';
import {
  getCheckedPojects,
  getProjects,
  getProjectSearchResults,
  getProjectsSearchField,
} from '../../store/selectors';

export default function Projects() {
  const projects = useSelector(getProjects);
  const checked = projects.checkAllProjects;
  const search = useSelector(getProjectsSearchField);
  const checkedProjects = useSelector(getCheckedPojects);
  const searchedProjects = useSelector(getProjectSearchResults);

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
        {!projects.projects.length && (
          <div className='error_project'> CREATE YOUR FIRST PROJECT!</div>
        )}
        {checked && !checkedProjects.length && (
          <div className='error_project'>
            {' '}
            {`you don't have favorite projects!`.toUpperCase()}
          </div>
        )}
        {search.length > 0 && !searchedProjects.length && (
          <div className='error_project'>PROJECTS NOT FOUND!</div>
        )}
      </div>
      <Outlet />
    </>
  );
}
