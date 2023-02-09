import { configureStore, createReducer } from '@reduxjs/toolkit';
import { ProjectType } from '../types';
import { checkProjectModal, checkProjectModalFields } from './actions';

export type RootState = {
  modals: {
    projectModal: {
      isOpen: boolean;
      //   view:'big' | 'small' | 'hidden'
      defaultType: string;
      defaultProjectName: string;
      defaultColumns: string[];
      columns: string[];
      inputs: {
        projectName: '';
        columnName: '';
        typeField: '';
      };
    };
  };
  projects: ProjectType[];
};

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
      },
    },
  },
  projects: [],
};

const JiraReducer = createReducer(initialState, builder => {
  builder
    .addCase(checkProjectModal, (state, action) => {
      state.modals.projectModal.isOpen = action.payload;
    })
    .addCase(checkProjectModalFields, (state, action) => {
      state.projects.push(action.payload);
    });
});

const store = configureStore({ reducer: JiraReducer });
export default store;
export type AppDispatch = typeof store.dispatch;
