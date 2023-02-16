import { createAction } from '@reduxjs/toolkit';
import { ProjectModalType, ProjectType, CardsType, BoardsType } from '../types';
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

export const addColumnForProjectInModal = createAction<string>(
  'jira/addColumnForProjectInModal'
);
export const deleteColumnForProjectImModal = createAction<string>(
  'jira/deleteColumnForProjectImModal'
);
export const refreshColumnsInModal = createAction<
  RootState['modals']['projectModal']['columns']
>('jira/refreshColumnsInModal');

export const addTaskBoard = createAction<CardsType>('board/add_task');

export const addCardBoard = createAction<BoardsType>('board/add_card');