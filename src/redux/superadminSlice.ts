import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SuperadminState {
  isSidebarOpen: boolean;
  selectedAdminId: string | null;
}

const initialState: SuperadminState = {
  isSidebarOpen: true,
  selectedAdminId: null,
};

const superadminSlice = createSlice({
  name: 'superadmin',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSelectedAdmin(state, action: PayloadAction<string | null>) {
      state.selectedAdminId = action.payload;
    },
  },
});

export const { toggleSidebar, setSelectedAdmin } = superadminSlice.actions;
export default superadminSlice.reducer; 