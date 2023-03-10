import { createSelector } from '@reduxjs/toolkit';
import { create } from 'domain';
import { Selector } from 'react-redux';
import { ProjectType } from '../types';
import { RootState } from './store';

export const getStore = createSelector([(state: RootState) => state], s => s);
export const getUser = createSelector(
  [(state: RootState) => state.user],
  user => user
);
export const selectProjectModal: Selector<
  RootState,
  RootState['modals']['projectModal']
> = createSelector(
  [(state: RootState) => state.modals.projectModal],
  toggle => toggle
);

export const getProjects: Selector<RootState, RootState['projects']> =
  createSelector([(st: RootState) => st.projects], projects => projects);
export const getCheckedPojects: Selector<
  RootState,
  RootState['projects']['projects']
> = createSelector([getProjects], projects => {
  return projects.checkAllProjects === true
    ? projects.projects.filter(item => item.checked)
    : projects.projects;
});
export const getProjectsSearchField = createSelector(
  [(state: RootState) => state.projectSearch],
  search => search
);
export const getProjectSearchResults = createSelector(
  [(state: RootState) => state.projectSearch, getCheckedPojects],
  (search, state) => {
    return search.length > 0
      ? state.filter(
          item =>
            item.name.toLowerCase().includes(search) ||
            item.lead.toLowerCase().includes(search)
        )
      : state;
  }
);

export const getSortedOptions = createSelector(
  [(state: RootState) => state.projects.sort],
  sort => sort
);
export const getSortedProjects = createSelector(
  [getProjectSearchResults, getSortedOptions],
  (projects, sort) => {
    const sortFunctionByFields: Record<
      RootState['projects']['sort']['by'],
      (pA: ProjectType, pB: ProjectType) => number
    > = {
      none: (pA, pB) => pA.id - pB.id,
      lead: (pA, pB) => pA.lead.localeCompare(pB.lead),
      name: (pA, pB) => pA.name.localeCompare(pB.name),
    };
    const sortFunc = sortFunctionByFields[sort.by];
    const selectProjects = sortFunc ? [...projects].sort(sortFunc) : projects;
    return sort.direction === 'asc' ? selectProjects : selectProjects.reverse();
  }
);

export const getColumnNameInModal = createSelector(
  [(state: RootState) => state.modals.projectModal.inputs.columnName],
  column => column
);

export const getProjectsProjects: Selector<
  RootState,
  RootState['projects']['projects']
> = createSelector(
  [(state: RootState) => state.projects.projects],
  projects => projects
);

export const getActiveProjectId = createSelector(
  [(state: RootState) => state.activeProjectId],
  state => state
);

export const getActiveProjectIndex = createSelector(
  [(state: RootState) => state.activeProjectIndex],
  state => state
);

export const getSearchCards = createSelector(
  [
    (state: RootState) => state.projects.projects,
    getActiveProjectIndex,
    getProjectsSearchField,
  ],
  (state, index, search) => {
    return search.length > 0
      ? state[index].columns.map(item =>
          item.cards.filter(elem =>
            elem.text.toLowerCase().includes(search.toLowerCase())
          )
        )
      : state[index].columns.map(item => item.cards);
  }
);
export const getUserRegister = createSelector(
  [(state: RootState) => state.register],
  user => user
);
