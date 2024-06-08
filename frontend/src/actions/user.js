import axios from "axios";

export const loginuser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginrequest",
    });

    const { data } = await axios.post(
      "https://socialmediaapp-backend.vercel.app/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const token = data.token ; 
    localStorage.setItem("token",token);


    dispatch({
      type: "loginsuccess",
      payload: data.User,

    });
  } catch (error) {
    dispatch({
      type: "loginfailure",
      payload: error.response.data.message,
    });
  }
};

export const loaduser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loaduserrequest",
    });

    const token = localStorage.getItem("token")

    const { data } = await axios.get(
      "https://socialmediaapp-backend.vercel.app/api/v1/me",{
      headers:{
        "Authorization":`Bearer ${token}`

        }

      }
    );

   

    dispatch({
      type: "loadusersuccess",
      payload: data.User,
      
    });
  } catch (error) {
    dispatch({
      type: "loaduserfailure",
      payload: error.response.data.message,
    });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    });

    const token = localStorage.getItem('token')

    const { data } = await axios.get(
      "https://socialmediaapp-backend.vercel.app/api/v1/posts",
      {
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
    );
    dispatch({
      type: "postOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostsRequest",
    });

    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      "https://socialmediaapp-backend.vercel.app/api/v1/my/posts",
      {
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
    );
    dispatch({
      type: "myPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  try {
    dispatch({
      type: "clearErrorSuccess",
    });
  } catch (error) {
    dispatch({
      type: "cleaerErrorFailure",
      payload: error.response.data.message,
    });
  }
};
export const getAllUsersByName = (name) => async (dispatch) => {
  try {
    dispatch({
      type: "allUsersByNameRequest",
    });

    const token = localStorage.getItem("token");

    console.log(token);

    const {data} = await axios.get(
      `https://socialmediaapp-backend.vercel.app/api/v1/users?name=${name}`,{
        headers:{
          "Authorization":`Bearer ${token}`
          }}
    );
    dispatch({
      type: "allUsersByNameSuccess",
      payload: data.Users
    });
  } catch (error) {
    dispatch({
      type: "allUsersByNameFailure",
      payload: error.response.data.message,
    });
  }
};


export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "allUsersRequest",
    });

    const token = localStorage.getItem("token");

    console.log(token);

    const {data} = await axios.get(
      `https://socialmediaapp-backend.vercel.app/api/v1/users`,{
        headers:{
          "Authorization":`Bearer ${token}`
          }}
    );
    dispatch({
      type: "allUsersSuccess",
      payload: data.Users
    });
  } catch (error) {
    dispatch({
      type: "allUsersFailure",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });
    const token = localStorage.removeItem("token")

    await axios.get("https://socialmediaapp-backend.vercel.app/api/v1/logout",{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    });

    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

//Register User action here
export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "registerloading",
      });

      const { data } = await axios.post(
        "https://socialmediaapp-backend.vercel.app/api/v1/register",

        { name, email, password, avatar },
        {
          headers: {
            
            "Content-Type": "application/json",
          }, 
        },
      );

      const token = data.token ; 
      localStorage.setItem("token",token);

      dispatch({
        type: "registersuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "registerfailure",
        payload: error.response.data.message,
      });
    }
  };

export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });
    const token = localStorage.getItem("token")
    const { data } = await axios.put(
      "https://socialmediaapp-backend.vercel.app/api/v1/update/profile",
      { name, email, avatar },
      {
        headers: {
          "Authorization":`Bearer ${token}`,
          "Content-type": "applications/json",
        },
      },
    );
    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailed",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await axios.put(
        "https://socialmediaapp-backend.vercel.app/api/v1/update/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });


    const { data } = await axios.delete(
      "https://socialmediaapp-backend.vercel.app/api/v1/delete/me",
    );

    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const { data } = await axios.post(
      "https://socialmediaapp-backend.vercel.app/api/v1/forgot/password",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

    const { data } = await axios.put(
      `https://socialmediaapp-backend.vercel.app/api/v1/password/reset/${token}`,
      {
        password,
      },
      {
        headers: {
          "Content-Type":"application/json",
        },
      },
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostsRequest",
    });

    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      `https://socialmediaapp-backend.vercel.app/api/v1/userposts/${id}`,
      {
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
    );
    dispatch({
      type: "userPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });

    const token = localStorage.getItem("token")

    const { data } = await axios.get(
      `https://socialmediaapp-backend.vercel.app/api/v1/user/${id}`,
      {
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
    );
    dispatch({
      type: "userProfileSuccess",
      payload: data.User,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });

    const token = localStorage.getItem("token")

    const { data } = await axios.get(
      `https://socialmediaapp-backend.vercel.app/api/v1/follow/${id}`,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
    );
    dispatch({
      type: "followUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};
