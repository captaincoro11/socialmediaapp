import { Button, LinearProgress, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../actions/post";
import { loaduser } from "../../actions/user";
import "./NewPost.css";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import {
  Circles,
  Grid,
  InfinitySpin,
  LineWave,
  Loader,
} from "react-loader-spinner";
const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(createNewPost(caption, image));
    dispatch(loaduser());
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error);

      
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      enqueueSnackbar(message);
      setImage(null);
      setCaption(" ")

      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <div className="newPost">
      <SnackbarProvider />
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>

        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        {loading ? (
          <LineWave height="4rem" />
        ) : (
          <>
            <Button type="submit">Post</Button>
          </>
        )}
      </form>
    </div>
  );
};

export default NewPost;
