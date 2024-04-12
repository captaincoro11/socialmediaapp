import {configureStore} from '@reduxjs/toolkit'
import {allUsersReducer, postOfFollowingReducer, userProfileReducer,userReducer} from './reducers/user'
import { likeReducer, myPostsReducer, userPostsReducer } from './reducers/post';
const store = configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:postOfFollowingReducer,
        allUsers:allUsersReducer,
        like:likeReducer,
        myPosts:myPostsReducer,
        userProfile:userProfileReducer,
        userPosts:userPostsReducer,
        allUsers:allUsersReducer,
        
    },
});
export default store;
