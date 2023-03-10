import { configureStore, createReducer } from '@reduxjs/toolkit';
import { userType } from '../components/types';
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
  addTaskBoard,
  hideModalView,
  changeModalView,
  addCardBoard,
  deleteCardBoard,
  deleteTaskBoard,
  sortDragAndDrop,
  setActiveProjectId,
  setActiveProjectIndex,
  loginUser,
  loadProjects,
  loadUser,
} from './actions';

let TASK_ID = 5;

export type RootState = {
  user: userType;
  register: {
    login: string;
    name: string;
    surname: string;
    isLogin: boolean;
  };
  modals: {
    projectModal: {
      isOpen: boolean;
      view: 'big' | 'small';
      isHidden: boolean;
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
  activeProjectId: number;
  activeProjectIndex: number;
};
// const initialProjects = [
//   {
//     name: '1',
//     key: 'Zyb6kr',
//     lead: 'Default lead1',
//     type: 'Team-managed software',
//     id: 1,
//     checked: false,
//     columns: [
//       {
//         title: 'TO DO',
//         id: 1,
//         cards: [
//           {
//             id: 1,
//             text: 'Test to do',
//           },
//           {
//             id: 2,
//             text: 'Test to do',
//           },
//         ],
//       },
//       {
//         title: 'IN PROGRESS',
//         id: 2,
//         cards: [
//           {
//             id: 3,
//             text: 'Test in progress',
//           },
//         ],
//       },
//       {
//         title: 'DONE',
//         id: 3,
//         cards: [
//           {
//             id: 4,
//             text: 'Test done',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Default Project',
//     key: 'sJaFMY',
//     lead: 'Default lead',
//     type: 'Team-managed software',
//     logo: `../../assets/icon/avatar_2.svg`,
//     id: 2,
//     checked: false,
//     columns: [
//       {
//         title: 'TO DO next',
//         id: 1,
//         cards: [
//           {
//             id: 1,
//             text: 'Test to do next',
//           },
//           {
//             id: 2,
//             text: 'Test to do',
//           },
//         ],
//       },
//       {
//         title: 'IN PROGRESS next',
//         id: 2,
//         cards: [
//           {
//             id: 3,
//             text: 'Test in progress',
//           },
//         ],
//       },
//       {
//         title: 'DONE next',
//         id: 3,
//         cards: [],
//       },
//     ],
//   },
// ];
// localStorage.getItem('jira_rs_clone')
// ? JSON.parse(localStorage.getItem('jira_rs_clone')!)
// :
let initialState: RootState = {
  user: {
    _id: '',
    login: '',
    password: '',
    name: '',
    surname: '',
    projects: [],
  },
  register: {
    name: '',
    surname: '',
    login: '',
    isLogin: false,
  },
  modals: {
    projectModal: {
      isOpen: false,
      isHidden: false,
      view: 'big',
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
    projects: [],
    checkAllProjects: false,
    sort: {
      by: 'none',
      direction: 'asc',
    },
  },
  projectSearch: '',
  activeProjectId: 0,
  activeProjectIndex: 0,
};
// window.addEventListener('beforeunload', event => {
//   localStorage.setItem('jira_rs_clone', JSON.stringify(initialState));
// });
// window.addEventListener('load', event => {
//   if (localStorage.getItem('jira_rs_clone')) {
//     initialState = JSON.parse(localStorage.getItem('jira_rs_clone')!);
//   }
// });

const JiraReducer = createReducer(initialState, builder => {
  builder
    .addCase(loadUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loadProjects, (state, action) => {
      state.projects.projects = action.payload;
    })
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
    })
    .addCase(addTaskBoard, (state, action) => {
      state.projects.projects.find(item => {
        if (item.id === action.payload.idProject) {
          item.columns.map(elem => {
            if (elem.id === action.payload.idCard) {
              elem.cards.push({
                id: TASK_ID,
                text: action.payload.text,
              });
              TASK_ID += 1;
            }
          });
        }
      });
    })
    .addCase(hideModalView, (state, action) => {
      state.modals.projectModal.isHidden = action.payload;
    })
    .addCase(changeModalView, (state, action) => {
      state.modals.projectModal.view = action.payload;
    })
    .addCase(addCardBoard, (state, action) => {
      state.projects.projects.find(item => {
        if (item.id === action.payload.idProject) {
          item.columns.push(action.payload);
        }
      });
    })
    .addCase(deleteCardBoard, (state, action) => {
      state.projects.projects.map(item => {
        if (item.id === action.payload.idProject) {
          item.columns.map((elem, i) => {
            if (elem.id === action.payload.id) {
              item.columns.splice(i, 1);
            }
          });
        }
      });
    })
    .addCase(deleteTaskBoard, (state, action) => {
      state.projects.projects.map(item => {
        if (item.id === action.payload.idProject) {
          item.columns.map(elem => {
            if (elem.id === action.payload.idCard) {
              elem.cards.map((todo, i) => {
                if (todo.id === action.payload.id) {
                  elem.cards.splice(i, 1);
                }
              });
            }
          });
        }
      });
    })
    .addCase(sortDragAndDrop, (state, action) => {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        indexProject,
      } = action.payload;

      if (droppableIdStart === droppableIdEnd) {
        const card = state.projects.projects[indexProject].columns.find(
          card => droppableIdStart === String(card.id)
        );
        const todo = card?.cards.splice(droppableIndexStart, 1);
        if (typeof todo !== 'undefined') {
          card?.cards.splice(droppableIndexEnd, 0, ...todo);
        }
      }

      if (droppableIdStart !== droppableIdEnd) {
        const cardStart = state.projects.projects[indexProject].columns.find(
          card => droppableIdStart === String(card.id)
        );
        const todo = cardStart?.cards.splice(droppableIndexStart, 1);
        const cardEnd = state.projects.projects[indexProject].columns.find(
          card => droppableIdEnd === String(card.id)
        );
        if (typeof todo !== 'undefined') {
          cardEnd?.cards.splice(droppableIndexEnd, 0, ...todo);
        }
      }
    })
    .addCase(setActiveProjectId, (state, action) => {
      state.activeProjectId = action.payload;
    })
    .addCase(setActiveProjectIndex, (state, action) => {
      state.activeProjectIndex = action.payload;
    })
    .addCase(loginUser, (state, action) => {
      state.register = action.payload;
    });
});

const store = configureStore({ reducer: JiraReducer });
export default store;
export type AppDispatch = typeof store.dispatch;
