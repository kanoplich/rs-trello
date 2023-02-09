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
