import { createSelector } from '@reduxjs/toolkit';
import { Selector } from 'react-redux';
import { RootState } from './store';

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
          item => item.name.includes(search) || item.lead.includes(search)
        )
      : state;
  }
);
