import { createAction } from '@reduxjs/toolkit';
import { ProjectModalType, ProjectType } from '../types';
import { RootState } from './store';

export const checkProjectModal = createAction<boolean>(
  'jira/checkProjectModal'
);

export const checkProjectModalFields = createAction<ProjectType>(
  'jira/checkProjectModalFields'
);
export const checkProject = createAction<number>('jira/checkProject');
export const checkAllProjects = createAction<boolean>('jira/checkAllProjects');
export const deleteProject = createAction<number>('jira/deleteProject');

export const checkProjectName = createAction<string>('jira/checkProjectName');
export const checkProjectType = createAction<string>('jira/checkProjectType');
export const checkProjectTeamLead = createAction<string>(
  'jira/checkProjectTeamLead'
);
export const checkProjectColumns = createAction<string>(
  'jira/checkProjectColumns'
);
export const refreshProjectModal = createAction<ProjectModalType>(
  'jira/refreshProjectModal'
);

export const checkProjectSearchField = createAction<string>(
  'jira/checkProjectSearchField'
);

export const sortProjectOptions = createAction<RootState['projects']['sort']>(
  'jira/sortProjectOptions'
);
