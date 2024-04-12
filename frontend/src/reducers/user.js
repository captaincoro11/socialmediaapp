import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated:false,

};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('loginloading', (state) => {
      state.loading = true;
    })
    .addCase('loginsuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase('loginfailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('registerloading', (state) => {
      state.loading = true;
    })
    .addCase('registersuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated =true;
    })
    .addCase('registerfailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('loaduserloading', (state) => {
      state.loading = true;
    })
    .addCase('loadusersuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase('loaduserfailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('LogoutUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('LogoutUserSuccess', (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase('LogoutUserFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    })
    .addCase('clearErrors',(state)=>{
      state.error=null;
    })
});

export const postOfFollowingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('postOfFollowingRequest', (state) => {
      state.loading = true;
    })
    .addCase('postOfFollowingSuccess', (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase('postOfFollowingFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});

  


export const allUsersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('allUsersRequest', (state) => {
      state.loading = true;
    })
    .addCase('allUsersSuccess', (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase('allUsersFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});

export const userProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('userProfileRequest', (state) => {
      state.loading = true;
    })
    .addCase('userProfileSuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase('userProfileFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});
