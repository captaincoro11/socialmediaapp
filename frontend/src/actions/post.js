import axios from "axios";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const token = localStorage.getItem("token");

    const { data } = await axios.get(`https://socialmediaapp-backend.vercel.app/api/v1/post/${id}`,{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    });
    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });


    const token = localStorage.getItem('token')


    const { data } = await axios.put(
      `https://socialmediaapp-backend.vercel.app/api/v1/post/comment/${id}`,
     
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      }
    );
    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });

    const { data } = await axios.delete(`https://socialmediaapp-backend.vercel.app/api/v1/post/comment/${id}`, {
      data: { commentId },
    });
    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const createNewPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });

    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `https://socialmediaapp-backend.vercel.app/api/v1/post/upload`,
      {
        caption,
        image,
      },
      {
        headers: {
          "Authorization":`Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePost = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const token = localStorage.getItem("token");

    const { data } = await axios.put(
      `https://socialmediaapp-backend.vercel.app/api/v1/post/${id}`,
      {
        caption,
      },
      {
        headers: {
          "Authorization":`Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const token = localStorage.getItem("token")

    const { data } = await axios.delete(`https://socialmediaapp-backend.vercel.app/api/v1/post/${id}`,{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    });
    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};
