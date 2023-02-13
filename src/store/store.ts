import { configureStore, createReducer } from '@reduxjs/toolkit';
import { ProjectModalType, ProjectType } from '../types';
import {
  checkAllProjects,
  checkProject,
  checkProjectColumns,
  checkProjectModal,
  checkProjectModalFields,
  checkProjectName,
  checkProjectSearchField,
  checkProjectTeamLead,
  checkProjectType,
  deleteProject,
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
  },
  {
    name: 'Default Project2',
    key: 'Xqf9r3',
    lead: 'Default lead2',
    type: 'Team-managed software',
    id: 2,
    checked: false,
  },
  {
    name: '3Default Project',
    key: 'H8WGyn',
    lead: 'Default lead3',
    type: 'Team-managed software',
    id: 3,
    checked: false,
  },
  {
    name: '4Default Project',
    key: 'RlWnDn',
    lead: '4Default lead',
    type: 'Team-managed software',
    id: 4,
    checked: false,
  },
  {
    name: '5Default Project',
    key: 'jNea9m',
    lead: 'Default lead5',
    type: 'Team-managed software',
    id: 5,
    checked: false,
  },
  {
    name: '6Default Project',
    key: 'TEdRZj',
    lead: 'Default lead6',
    type: 'Team-managed software',
    id: 6,
    checked: false,
  },
  {
    name: 'Default Project',
    key: 'nwjBKQ',
    lead: 'Default lead',
    type: 'Team-managed software',
    id: 7,
    checked: false,
  },
  {
    name: 'Default Project',
    key: 'u8aLYi',
    lead: 'Default lead',
    type: 'Team-managed software',
    id: 8,
    checked: false,
  },
  {
    name: 'Default Project',
    key: 'ENYl5f',
    lead: 'Default lead',
    type: 'Team-managed software',
    id: 9,
    checked: true,
  },
  {
    name: 'Default Project',
    key: 'uXOHst',
    lead: 'Default lead',
    type: 'Team-managed software',
    id: 10,
    checked: true,
  },
  {
    name: 'Default Project',
    key: 'BwXfBA',
    lead: 'Default lead',
    type: 'Team-managed software',
    id: 11,
    checked: true,
  },
  {
    name: 'Default Project',
    key: 'Z9GDfa',
    lead: 'Default lead',
    type: 'Team-managed software',
    id: 12,
    checked: false,
  },
  {
    name: 'Default Project',
    key: 'CdXJKj',
    lead: 'Default lead',
    type: 'Team-managed software',
    id: 13,
    checked: false,
  },
  {
    name: 'Default Project',
    key: 'LVQPrc',
    lead: 'Default lead',
    type: 'Team-managed software',
    id: 14,
    checked: false,
  },
  {
    name: 'Default Project',
    key: 'sJaFMY',
    lead: 'Default lead',
    type: 'Team-managed software',
    id: 15,
    checked: false,
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
      state.modals.projectModal.inputs.projectName = action.payload;
    })
    .addCase(refreshProjectModal, (state, action) => {
      state.modals.projectModal.inputs = action.payload;
    })
    .addCase(checkProjectSearchField, (state, action) => {
      state.projectSearch = action.payload;
    })
    .addCase(sortProjectOptions, (state, action) => {
      state.projects.sort = action.payload;
    });
});

const store = configureStore({ reducer: JiraReducer });
export default store;
export type AppDispatch = typeof store.dispatch;
