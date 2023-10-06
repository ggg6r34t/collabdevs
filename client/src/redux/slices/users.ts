import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../type/types";

type UserList = {
  users: User[];
  isLoading: boolean;
  searchResults: User[];
  isSearchActive: boolean;
};

const initialState: UserList = {
  users: [],
  isLoading: true,
  searchResults: [],
  isSearchActive: false,
};

const usersSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    searchUser: (
      state,
      action: PayloadAction<{ query: string; type: string }>
    ) => {
      const { query, type } = action.payload;

      if (type === "user") {
        // filter users based on username and first name matches
        const userResults = state.users.filter((user) => {
          const usernameMatch = user.username
            ?.toLowerCase()
            .includes(query.toLowerCase());
          const firstNameMatch = user.firstName
            ?.toLowerCase()
            .includes(query.toLowerCase());
          return usernameMatch || firstNameMatch;
        });
        state.searchResults = userResults;
      } else {
        state.searchResults = [];
      }

      // check if the query is empty or if there are no search results
      state.isSearchActive =
        query.trim() !== "" || state.searchResults.length > 0;
    },

    setIsSearchActive: (state, action: PayloadAction<boolean>) => {
      state.isSearchActive = action.payload;
    },
    resetSearchResults: (state) => {
      // reset the search results by fetching the original posts
      state.searchResults = [];
      state.isSearchActive = false;
    },
  },
});

export const usersActions = usersSlice.actions;
const usersReducer = usersSlice.reducer;
export default usersReducer;
