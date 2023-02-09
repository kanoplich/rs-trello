import { configureStore, createReducer } from '@reduxjs/toolkit';
import { checkProjectModal } from './actions';

export type RootState = {
  modals: { projectModal: boolean };
};

const initialState: RootState = {
  modals: { projectModal: false },
};

const JiraReducer = createReducer(initialState, builder => {
  builder.addCase(checkProjectModal, (state, action) => {
    state.modals.projectModal = action.payload;
  });
});
const store = configureStore({ reducer: JiraReducer });
export default store;
export type AppDispatch = typeof store.dispatch;
