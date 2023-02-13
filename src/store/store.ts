import { configureStore, createReducer } from '@reduxjs/toolkit';
import { ProjectModalType, ProjectType } from '../types';
import {
  addColumnForProjectInModal,
  checkAllProjects,
  checkProject,
  checkProjectColumns,
  checkProjectModal,
  checkProjectModalFields,
  checkProjectName,
  checkProjectSearchField,
  checkProjectTeamLead,
  checkProjectType,
  deleteColumnForProjectImModal,
  deleteProject,
  refreshColumnsInModal,
  refreshProjectModal,
  sortProjectOptions,
} from './actions';

export type RootState = {
  modals: {
    projectModal: {
      isOpen: boolean;
      //   view:'big' | 'small' | 'hidden'
      defaultType: string;
      defaultProjectName: string;
      defaultColumns: string[];
      columns: string[];
      inputs: ProjectModalType;
    };
  };
  projects: {
    projects: ProjectType[];
    checkAllProjects: boolean;
    sort: {
      by: 'name' | 'lead' | 'none';
      direction: 'asc' | 'desc';
    };
  };
  projectSearch: string;
};
const initialProjects = [
  {
    name: '1',
    key: 'Zyb6kr',
    lead: 'Default lead1',
    type: 'Team-managed software',
    id: 1,
    checked: false,
    columns: {},
  },
  {
    name: 'Default Project',
    key: 'sJaFMY',
    lead: 'Default lead',
    type: 'Team-managed software',
    id: 2,
    checked: false,
    columns: {},
  },
];
const initialState: RootState = {
  modals: {
    projectModal: {
      isOpen: false,
      defaultType: 'Team-managed software',
      defaultProjectName: 'Default Project',
      defaultColumns: ['TODO', 'IN PROGRESS', 'DONE'],
      columns: ['TODO', 'IN PROGRESS', 'DONE'],
      inputs: {
        projectName: '',
        columnName: '',
        typeField: '',
        teamLead: '',
      },
    },
  },
  projects: {
    projects: initialProjects,
    checkAllProjects: false,
    sort: {
      by: 'none',
      direction: 'asc',
    },
  },
  projectSearch: '',
};

const JiraReducer = createReducer(initialState, builder => {
  builder
    .addCase(checkProjectModal, (state, action) => {
      state.modals.projectModal.isOpen = action.payload;
    })
    .addCase(checkProjectModalFields, (state, action) => {
      state.projects.projects.push(action.payload);
    })
    .addCase(checkProject, (state, action) => {
      state.projects.projects = state.projects.projects.map(item => {
        if (item.id === action.payload) {
          item.checked = !item.checked;
        }
        return item;
      });
    })
    .addCase(checkAllProjects, (state, action) => {
      state.projects.checkAllProjects = !state.projects.checkAllProjects;
    })
    .addCase(deleteProject, (state, action) => {
      state.projects.projects = state.projects.projects.filter(
        item => item.id !== action.payload
      );
    })
    .addCase(checkProjectName, (state, action) => {
      state.modals.projectModal.inputs.projectName = action.payload;
    })
    .addCase(checkProjectType, (state, action) => {
      state.modals.projectModal.inputs.typeField = action.payload;
    })
    .addCase(checkProjectTeamLead, (state, action) => {
      state.modals.projectModal.inputs.teamLead = action.payload;
    })
    .addCase(checkProjectColumns, (state, action) => {
      state.modals.projectModal.inputs.columnName = action.payload;
    })
    .addCase(addColumnForProjectInModal, (state, action) => {
      if (
        state.modals.projectModal.columns.find(
          item => item === action.payload
        ) ||
        action.payload === ''
      )
        return;
      state.modals.projectModal.columns.push(action.payload);
    })
    .addCase(deleteColumnForProjectImModal, (state, action) => {
      state.modals.projectModal.columns =
        state.modals.projectModal.columns.filter(
          item => item !== action.payload
        );
    })
    .addCase(refreshProjectModal, (state, action) => {
      state.modals.projectModal.inputs = action.payload;
    })
    .addCase(checkProjectSearchField, (state, action) => {
      state.projectSearch = action.payload;
    })
    .addCase(sortProjectOptions, (state, action) => {
      state.projects.sort = action.payload;
    })
    .addCase(refreshColumnsInModal, (state, action) => {
      state.modals.projectModal.columns = action.payload;
    });
});

const store = configureStore({ reducer: JiraReducer });
export default store;
export type AppDispatch = typeof store.dispatch;
