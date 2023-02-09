import { createAction } from '@reduxjs/toolkit';

export const checkProjectModal = createAction<boolean>(
  'jira/checkProjectModal'
);
