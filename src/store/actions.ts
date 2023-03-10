import { createAction } from '@reduxjs/toolkit';
import { ProjectTypeNew, userType } from '../components/types';
import {
  ProjectModalType,
  ProjectType,
  CardsType,
  BoardsType,
  ISort,
} from '../types';
import { RootState } from './store';

export const loadUser = createAction<userType>('jira/loadUser');
export const loadProjects = createAction<ProjectType[]>('jira/loadprojects');
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

export const hideModalView = createAction<boolean>('jira/hideModalView');
export const changeModalView = createAction<'big' | 'small'>(
  'jira/changeModalView'
);
export const addCardBoard = createAction<BoardsType>('board/add_card');

export const deleteCardBoard = createAction<BoardsType>('board/delete_card');

export const deleteTaskBoard = createAction<CardsType>('board/delete_task');

export const sortDragAndDrop = createAction<ISort>('board/sort_drag_and_drop');

export const setActiveProjectId = createAction<number>(
  'board/active_project_id'
);

export const setActiveProjectIndex = createAction<number>(
  'board/active_project_index'
);

export const loginUser = createAction<{
  login: string;
  name: string;
  surname: string;
  isLogin: boolean;
}>('user/logout');
