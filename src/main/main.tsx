import React from 'react';
import { Outlet } from 'react-router-dom';
import './main.css';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import WorkspacePage from './workspace/workspace';
import Projects from './projects/projects';
import { createPortal } from 'react-dom';
import CreateProjectModal from './projects/project-modal';
export function Main() {
  return (
    <>
      <Header />
      <main className='main'>
        <Outlet />
      </main>
      {createPortal(<CreateProjectModal />, document.body)}
      <Footer />
    </>
  );
}
export const routes = [
  { name: 'Workspace', path: '/workspace', element: () => WorkspacePage() },
  {
    name: 'Projects',
    path: '/projects',
    element: <Projects />,
  },
];
