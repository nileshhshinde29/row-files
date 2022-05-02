import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { TextField, Box, Grid, Container, Typography, FormControl ,FormLabel ,Button, TextareaAutosize, Radio ,RadioGroup, FormControlLabel } from '@mui/material';

import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { LocalizationProvider , DatePicker} from '@mui/lab'
// import MuiPhoneNumber from "material-ui-phone-number";
import { useNavigate } from "react-router-dom";




const Edit = () => {
  const navigate = useNavigate()
  const formData = new FormData();
  let id=JSON.parse(localStorage.getItem('id'))
  const [authValue, setAuthValue] = useState(localStorage.getItem("authkey"));
  const [userDetails, setUserDetails] = useState({});

  const [obj, setObj] = useState({
  userId:id,
  bio: userDetails.bio && userDetails.bio,
  gender: "",
  image: "",
  username: "",
  dob: "",
  email: "",
  mobile: "",
});


  useEffect(() => {
    axios
      .get(`http://localhost:7000/user/${id}`, {
        headers: {
          authorization:JSON.parse(localStorage.getItem('token')),
        },
      })
      .then((resp) => {
       console.log(resp)
         
        setObj({...obj , ...resp.data })
        // setObj({
        //   ...obj,
        //   bio: resp?.data.bio && resp.bio,
        //   gender: resp?.data.gender && resp.data.gender,
        //   image: resp.data?.image && resp.data.image,
        //   username: resp.data?.userName && resp.data.username,
        //   dob: resp.data.dob && resp.data.dob,
        //   email: resp.data.email && resp.data.email,
        //   mobile: resp.data.mobile && resp.data.mobile,
        // });
      });
  }, []);

  console.log(obj);


  // firstname: {
  //     type: String,
  //     require: true,
  //   },
  //   lastname: {
  //     type: String,
  //     require: true,
  //   },
  //   email: {
  //     type: String,
  //     require: true,
  //     max: 50,
  //     unique: true,
  //   },
  //   password: {
  //     type: String,
  //     require: true,
  //     min: 6,
  //   },
  //   profilePicture: {
  //     type: String,
  //     default: "",
  //   },

  //   isAdmin: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   bio: {
  //     type: String,
  //     max: 50,
  //   },
  //   dob: {
  //     type: String,
  //   },
  //   gender: {
  //     type: String,
  //     require: true,
  //   },
  //   mobile: {
  //     type: Number,
  //   },
  //   username: {
  //     type: String,
  //     require: true,
  //   },
  
  const updateUser = () => {
    console.log(obj);
    formData.append("userId" ,obj.userId)
    formData.append("bio", obj.bio);
    formData.append("gender", obj.gender);
    formData.append("image", obj.image);
    formData.append("username", obj.username);
    formData.append("dob", obj.dob);
    formData.append("email", obj.email);
    formData.append("mobile", obj.mobile);

    axios
      .put(`http://localhost:7000/user/${id}`, formData, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((resp) => {
        console.log(resp);
        formData.delete("bio");
        formData.delete("gender");
        formData.delete("image");
        formData.delete("userName");
        formData.delete("dob");
        formData.delete("email");
        formData.delete("mobile");
      }).catch = (err) => {
      console.log(err);
    };
  };

  return (
    <div>
      <form>
        <Grid
          container
          alignItems={"center"}
          sx={{ marginLeft: "auto", marginRight: "auto" }}
          spacing={2}
          // xs={12}
        >
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Edit Profile
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <input
              fullWidth
              // onChange={(e) => setObj({ ...obj, profilePicture: e.target.value })}
              type="file"
              accept="image/*"
              // value={`http://localhost:7000/${obj?.profilePicture}`} 
              label="Upload Photo"
              onChange={(e) => setObj({ ...obj, image: e.target.files[0] })}
              // error={formErrors.email && true}
              // helperText={formErrors.email}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              // onChange={(e) => setData({ ...data, password: e.target.value })}
              label="userName"
              value={obj.username}
              onChange={(e) => setObj({ ...obj, username: e.target.value })}
              // error={formErrors.password && true}
              // helperText={formErrors.password}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Bio"
              value={obj.bio}
              onChange={(e) => setObj({ ...obj, bio: e.target.value })}
              minRows={3}
              //  labal="Bio"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={obj.gender}
                onChange={(e) => setObj({ ...obj, gender: e.target.value })}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disableFuture
                label="Date Of Birth"
                value={obj.dob}
                openTo="year"
                views={["year", "month", "day"]}
                // value={AllEmployeData.DOB}
                onChange={(newValue) => {
                  setObj({ ...obj, dob: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              onChange={(e) => setObj({ ...obj, email: e.target.value })}
              value={obj.email}
              label="Email"
              type="email"
              // error={formErrors.password && true}
              // helperText={formErrors.password}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              onChange={(e) => setObj({ ...obj, mobile: e.target.value })}
              value={obj.mobile}
              label="Mobile"
              type="mobile"
              // error={formErrors.password && true}
              // helperText={formErrors.password}
              variant="outlined"
            />
            {/* <MuiPhoneNumber  />, */}
            {/* <MuiPhoneNumber
              defaultCountry={"in"}
              name="mobile"
              value={obj.mobile}
              onChange={(value) =>
                setObj({
                  ...obj,
                  mobile: value,
                })
              }
              InputLabelProps={{ style: { fontSize: 18 } }}
            /> */}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: "red" }}>
              {/* {formErrors.backendError} */}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={() => updateUser()}>
              {" "}
              Save
            </Button>
            
          </Grid>
          <Grid item xs={12}>
           
            <Button fullWidth variant="contained" onClick={() => navigate("/")}>
              {" "}
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default Edit;
