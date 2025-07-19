import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  isSidebarOpen: boolean;
  selectedLeadId: string | null;
}

const initialState: AdminState = {
  isSidebarOpen: true,
  selectedLeadId: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSelectedLead(state, action: PayloadAction<string | null>) {
      state.selectedLeadId = action.payload;
    },
  },
});

export const { toggleSidebar, setSelectedLead } = adminSlice.actions;
export default adminSlice.reducer; 