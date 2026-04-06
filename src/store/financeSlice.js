import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "Admin", // 'Admin' or 'User'
  activeTab: "Dashboard",
  filters: {
    searchQuery: "",
    type: "all", // 'all', 'income', or 'expense'
    category: "all",
  },
  filters: {
    searchQuery: "",
    type: "all",
    sortBy: "date-desc",
  },

  isDarkMode: false,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    // Action to toggle roles for the demo
    setRole: (state, action) => {
      state.role = action.payload;
    },
    // Update search query as user types
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    // Filter by type (Income vs Expense)
    setTypeFilter: (state, action) => {
      state.filters.type = action.payload;
    },
    // Reset all filters
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const {
  setRole,
  setSearchQuery,
  setTypeFilter,
  clearFilters,
  toggleDarkMode,
  setSortBy,
  setActiveTab,
} = financeSlice.actions;

export default financeSlice.reducer;
