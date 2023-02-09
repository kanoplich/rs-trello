import { createAction } from '@reduxjs/toolkit';
import { ProjectType } from '../types';

export const checkProjectModal = createAction<boolean>(
  'jira/checkProjectModal'
);

export const checkProjectModalFields = createAction<ProjectType>(
  'jira/checkProjectModalFields'
);
