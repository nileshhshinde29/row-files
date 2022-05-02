import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import ForumIcon from '@mui/icons-material/Forum';
import axios from "axios";
// import ScrollFun from '../public/ScrollFun';

import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Posts from "./Posts"
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Button, Grid, TextField } from "@mui/material";
import { fontSize } from "@mui/system";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Scrolling() {
  const [data, setData] = useState([]);
  let id = JSON.parse(localStorage.getItem("id"));
  const [state, setState] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoding] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [comment, setComment] = useState({
    comment:"hello",
    userId:id
  });

  function fetch() {
    axios
      .get(`http://localhost:7000/posts/`, {
        headers: { authorization: JSON.parse(localStorage.getItem("token")) },
      })
      .then((response) => {
        setData(response.data.posts.results.reverse());
        console.log(response.data.posts.results.reverse())

        // setData( {...response.data, userId:id ,  username:response.data.firstname,password:'Nilesh@123'})
      })
      .catch((error) => console.log(error));
  }

  function Like(postId, userId) {
    // console.log(postId);
    // console.log(userId);
    axios
      .put(
        `http://localhost:7000/posts/${postId}/like`,
        { userId },
        {
          headers: { authorization: JSON.parse(localStorage.getItem("token")) },
        }
      )
      .then((response) => {
        console.log(response);
        fetch();

        //:id/comment setData( {...response.data, userId:id ,  username:response.data.firstname,password:'Nilesh@123'})
      })
      .catch((error) => console.log(error));
  }

  function CommentFun(myId) {
    axios
      .put(`http://localhost:7000/posts/${myId}/comment`, comment, {
        headers: { authorization: JSON.parse(localStorage.getItem("token")) },
      })
      .then((response) => {
        console.log(response);
        fetch()

        //:id/comment setData( {...response.data, userId:id ,  username:response.data.firstname,password:'Nilesh@123'})
      })
      .catch((error) => console.log(error));
  }

  useState(() => {
    fetch();
  }, []);

  // useEffect(()=>{
  //    setLoding(true)
  //   axios
  //       .get(
  //         `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
  //       )
  //       .then(res => {
  //         setState([...state, ...res.data] );

  //         setLoding(false)
  //       });

  //   // .then(res => setState([...state, res.data]))
  // },[page])

  // const scrollEnd =()=>{

  //   setPage(page + 1)
  // }

  // window.onscroll = function(){
  //   if( window.innerHeight +document.documentElement.scrollTop
  //       === document.documentElement.offsetHeight)
  //       {
  //         scrollEnd()
  //       }
  // }

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (id) => {
    setExpanded(expanded  ? false : id);
  };

  // const myData = data.map(el=>fetching(el.userId))
  // console.log(myData)
  async function fetching(myId) {
    axios
      .get(`http://localhost:7000/user/all`, {
        headers: { authorization: JSON.parse(localStorage.getItem("token")) },
      })
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    fetching();
  }, []);

  return (
    <div className="App">

      <Posts/>
      {/* <div className="container ">
        {
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              title={"Create Post"}
              // subheader={ myData && myData[0].lastname}
            />
            <Grid
              container
              alignItems={"center"}
              sx={{ marginLeft: "30", marginRight: "30" }}
              spacing={2}
              // xs={12}
            >
              <Grid item xs={12}>
                <input type="file" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  // onChange={(e) => setData({ ...data, email: e.target.value })}
                  id="outlined-basic"
                  label="caption"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  // onChange={(e) => setData({ ...data, email: e.target.value })}
                  id="outlined-basic"
                  label="caption"
                >
                  Post
                </Button>
              </Grid>
            </Grid>
          </Card>
        }
      </div> */}
      {data.map((el, i) => {
        const myData = allUsers.filter((itms) => itms._id == el.userId && itms);

        return (
          <div key={i} className="container">
            {
              <Card sx={{ minWidth: 400 ,border:"2px solid "}} >
                <CardHeader 
                   sx={{backgroundColor:"#ff0066"}}
                  avatar={
                    <Avatar
                      aria-controls={"basic-menu"}
                      aria-haspopup="true"
                      alt="Remy Sharp"
                      src={
                        (myData.length &&
                          ("http://localhost:7000/" +
                            myData[0].profilePicture ||
                            "")) ||
                        ""
                      }
                    />
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={ <h2 style={{color:"white"}}>{myData.length && myData[0].firstname}</h2>}
                  subheader={myData.length && myData[0].lastname}
                />
                <br/>
                <img
                  src={"http://localhost:7000/" + el.img}
                  height="200px"
                  width="300px"
                  alt={`post`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {el.caption}
                  </Typography>
                </CardContent>
                <CardActions sx={{backgroundColor:"#8600b3"}} disableSpacing>
                  <IconButton aria-label="add to favorites">
                    {el.likes.length}
                    <FavoriteIcon onClick={() => Like(el._id, myData[0]._id)} />
                  </IconButton>

                  <ExpandMore sx={{backgroundColor:"green"}}
                    expand={expanded==el._id}
                    onClick={()=>handleExpandClick(el._id)}
                    aria-expanded={expanded==el._id}
                    // aria-label=""
                    // lable="comments"
                  >
                   <ForumIcon/>
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded==el._id} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph> 
                    <TextField id="outlined-basic" 
                     onChange={(e) => setComment({...comment, comment:e.target.value})} 
                     label="Add Comment" variant="outlined" /> 
                     <AddCircleOutlineSharpIcon  onClick={() => CommentFun(el._id)}/>
                     </Typography>
                     <ul style={{listStyleType:"none"}}>
                    {el.comments.map((itms, i ) => (
                      <li> {
                        <CardHeader
                  avatar={
                    <Avatar
                      aria-controls={"basic-menu"}
                      aria-haspopup="true"
                      alt="Remy Sharp"
                      src={
                        (myData.length &&
                          ("http://localhost:7000/" +
                            myData[0].profilePicture ||
                            "")) ||
                        ""
                      }
                    />
                  }
                  // action={
                  //   <IconButton aria-label="settings">
                  //     <MoreVertIcon />
                  //   </IconButton>
                  // }
                  title={myData.length && myData[0].firstname}
                   
                  subheader={ itms?.comment}
                />
                       }</li>
                    ))}</ul>

                   
                  </CardContent>
                </Collapse>
              </Card>
            }
          </div>
        );
      })}

      {loading && (
        <div className="container">
          {" "}
          <Stack width={300} spacing={1}>
            <Skeleton variant="text" width={300} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={300} height={118} />
          </Stack>
        </div>
      )}
    </div>
  );
}

export default Scrolling;



// import React from "react";
// import "../App.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// // import ScrollFun from '../public/ScrollFun';
// import Posts from "./Posts"
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
// import IconButton, { IconButtonProps } from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Skeleton from "@mui/material/Skeleton";
// import Stack from "@mui/material/Stack";
// import { Button, Grid, TextField } from "@mui/material";

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// function Scrolling() {
//   const [data, setData] = useState([]);
//   let id = JSON.parse(localStorage.getItem("id"));
//   const [state, setState] = useState([]);
//   const [page, setPage] = useState(0);
//   const [loading, setLoding] = useState(false);
//   const [allUsers, setAllUsers] = useState([]);
//   const [comment, setComment] = useState("");

//   function fetch() {
//     axios
//       .get(`http://localhost:7000/posts/`, {
//         headers: { authorization: JSON.parse(localStorage.getItem("token")) },
//       })
//       .then((response) => {
//         setData(response.data.posts.results);

//         // setData( {...response.data, userId:id ,  username:response.data.firstname,password:'Nilesh@123'})
//       })
//       .catch((error) => console.log(error));
//   }

//   function Like(postId, userId) {
//     // console.log(postId);
//     // console.log(userId);
//     axios
//       .put(
//         `http://localhost:7000/posts/${postId}/like`,
//         { userId },
//         {
//           headers: { authorization: JSON.parse(localStorage.getItem("token")) },
//         }
//       )
//       .then((response) => {
//         console.log(response);
//         fetch();

//         //:id/comment setData( {...response.data, userId:id ,  username:response.data.firstname,password:'Nilesh@123'})
//       })
//       .catch((error) => console.log(error));
//   }

//   function CommentFun(myId) {
//     axios
//       .put(`http://localhost:7000/posts/${myId}/comment`, comment, {
//         headers: { authorization: JSON.parse(localStorage.getItem("token")) },
//       })
//       .then((response) => {
//         console.log(response);
        

//         //:id/comment setData( {...response.data, userId:id ,  username:response.data.firstname,password:'Nilesh@123'})
//       })
//       .catch((error) => console.log(error));
//   }

//   useState(() => {
//     fetch();
//   }, []);

//   // useEffect(()=>{
//   //    setLoding(true)
//   //   axios
//   //       .get(
//   //         `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
//   //       )
//   //       .then(res => {
//   //         setState([...state, ...res.data] );

//   //         setLoding(false)
//   //       });

//   //   // .then(res => setState([...state, res.data]))
//   // },[page])

//   // const scrollEnd =()=>{

//   //   setPage(page + 1)
//   // }

//   // window.onscroll = function(){
//   //   if( window.innerHeight +document.documentElement.scrollTop
//   //       === document.documentElement.offsetHeight)
//   //       {
//   //         scrollEnd()
//   //       }
//   // }

//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   // const myData = data.map(el=>fetching(el.userId))
//   // console.log(myData)
//   async function fetching(myId) {
//     axios
//       .get(`http://localhost:7000/user/all`, {
//         headers: { authorization: JSON.parse(localStorage.getItem("token")) },
//       })
//       .then((response) => {
//         setAllUsers(response.data);
//       })
//       .catch((error) => console.log(error));
//   }
//   useEffect(() => {
//     fetching();
//   }, []);

//   return (
//     <div className="App">
//       <Posts setData={setData} />
//       {/* <div className="container ">
//         {
//           <Card sx={{ maxWidth: 345 }}>
//             <CardHeader
//               title={"Create Post"}
//               // subheader={ myData && myData[0].lastname}
//             />
//             <Grid
//               container
//               alignItems={"center"}
//               sx={{ marginLeft: "30", marginRight: "30" }}
//               spacing={2}
//               // xs={12}
//             >
//               <Grid item xs={12}>
//                 <input type="file" />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   // onChange={(e) => setData({ ...data, email: e.target.value })}
//                   id="outlined-basic"
//                   label="caption"
//                   variant="outlined"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button
//                   fullWidth
//                   // onChange={(e) => setData({ ...data, email: e.target.value })}
//                   id="outlined-basic"
//                   label="caption"
//                 >
//                   Post
//                 </Button>
//               </Grid>
//             </Grid>
//           </Card>
//         }
//       </div> */}
//       {data.map((el, i) => {
//         const myData = allUsers.filter((itms) => itms._id == el.userId && itms);

//         // console.log(myData);

//         return (
//           <div key={i} className="container">
//             {
//               <Card sx={{ maxWidth: 400 }} className="RED">
//                 <CardHeader
//                   avatar={
//                     <Avatar
//                       aria-controls={"basic-menu"}
//                       aria-haspopup="true"
//                       alt="Remy Sharp"
//                       src={
//                         (myData.length && (myData[0].profilePicture || "")) ||
//                         ""
//                       }
//                     />
//                   }
//                   action={
//                     <IconButton aria-label="settings">
//                       <MoreVertIcon />
//                     </IconButton>
//                   }
//                   title={myData.length && myData[0].firstname}
//                   subheader={myData.length && myData[0].lastname}
//                 />
//                 <img
//                   src={"http://localhost:7000/" + el.img}
//                   // src={require(`https://localstorage:7000/${el.img}`)}
//                   height="100px"
//                   width="200px"
//                   alt={`post`}
//                 />
//                 <CardContent>
//                   <Typography variant="body2" color="text.secondary">
//                     {el.caption}
//                   </Typography>
//                 </CardContent>
//                 <CardActions disableSpacing>
//                   <IconButton aria-label="add to favorites">
//                     {el.likes.length}
//                     <FavoriteIcon onClick={() => Like(el._id, myData[0]._id)} />
//                   </IconButton>

//                   <ExpandMore
//                     expand={expanded}
//                     onClick={handleExpandClick}
//                     aria-expanded={expanded}
//                     aria-label="show more"
//                     lable="comments"
//                   >
//                     <h6>Comments</h6>
//                   </ExpandMore>
//                 </CardActions>
//                 <Collapse in={expanded} timeout="auto" unmountOnExit>
//                   <CardContent>
//                     <Typography paragraph>comments:</Typography>

//                     {el.comments.map((itms, i) => (
//                       <li> {itms}</li>
//                     ))}

//                     <input
//                       id={i}
//                       onChange={(e) => setComment(e.target.value)}
//                     />
//                     <button onClick={() => CommentFun(el._id)}>
//                       add comment
//                     </button>
//                   </CardContent>
//                 </Collapse>
//               </Card>
//             }
//           </div>
//         );
//       })}

//       {loading && (
//         <div className="container">
//           {" "}
//           <Stack width={300} spacing={1}>
//             <Skeleton variant="text" width={300} />
//             <Skeleton variant="circular" width={40} height={40} />
//             <Skeleton variant="rectangular" width={300} height={118} />
//           </Stack>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Scrolling;
