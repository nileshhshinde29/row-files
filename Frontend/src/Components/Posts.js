import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import axios from "axios";
function Posts() {
  const formData = new FormData();
  const navigate = useNavigate();
  // const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [authValue, setAuthValue] = useState(localStorage.getItem("token"));
  // console.log(authValue);
  //   console.log(location);

  // useEffect(() => {

  //   axios
  //     .get("http://localhost:3300/api/post/getPost", {
  //       headers: {
  //         authorization: authValue,
  //       },
  //     })
  //     .then((resp) => setPosts(resp.data));
  // }, []);

  const [obj, setObj] = useState({
    caption: "",
    image: "",
    userId: JSON.parse(localStorage.getItem("id")),
  });
  // const logout = () => {
  //   localStorage.clear();
  //   navigate("/login");
  // };
  //   console.log(authValue);
  // useEffect(() => {
  //   if (authValue !== null) navigate("/");
  //   if (authValue === null) navigate("/login");
  // }, [authValue]);

  const uploaddata = (props) => {
    // console.log(obj);
    formData.append("image", obj.img);
    formData.append("caption", obj.caption);
    formData.append("userId", obj.userId);

  
    axios
      .post("http://localhost:7000/posts/create", formData, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((resp) => {
        axios
          .get("http://localhost:7000/posts/", {
            headers: {
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          })
          .then((resp) => props.setData(resp.data));
        formData.delete("image");
        formData.delete("caption");
        formData.delete("userId");
      }).catch = (err) => {
      console.log(err);
    };
  };

  console.log(obj);

  // console.log(obj);setData
  return (
    <div className="App">
      {" "}
      <div>
        {/* <br /> */}
        <br />
        <Card sx={{ maxWidth: 345 }}>
          <label>Upload Image: </label>
          <input
            style={{ marginLeft: "60px" }}
            type="file"
            name="image"
            multiple
            accept="image/*"
            onChange={(e) => setObj({ ...obj, img: e.target.files[0] })}
          />
          <br />
          <br />
          <label>Caption: </label>
          <br />
          <br />
          <textarea
            onChange={(e) => setObj({ ...obj, caption: e.target.value })}
            type="text"
            style={{ width: "250px", height: "70px" }}
          />
          <CardContent></CardContent>
          <CardActions>
            <Button size="small" onClick={() => uploaddata()}>
              Upload Post
            </Button>
            <Button size="small">Cancel</Button>
          </CardActions>
        </Card>
      </div>
      {/* {posts &&
        posts.map((post) => (setData

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.caption}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))} */}
    </div>
  );
}

export default Posts;
