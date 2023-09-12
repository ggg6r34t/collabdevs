import React from 'react'

import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Box,
  Grid,
  Checkbox,
  TextField,
  Button,
  Avatar,
  Container,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function SigningUp() {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      //TODO : Form Validation
      const data = new FormData(event.currentTarget);
  
      const userInformation = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email".toLowerCase()),
        userName: data.get("userName"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword"),
        gender: data.get("gender"),
        country:data.get("country"),
        interests: data.get("interests"),
      };
  
      function onSuccess() {
        // confirmAlert({
        //   title: `Congratulation! ${userInformation.userName}`,
        //   message: "You successfully created an account. Click OK to login",
        //   buttons: [
        //     {
        //       label: "OK",
        //       onClick: () => navigate("/users/signin"),
        //     },
        //   ],
        // });
      }
      if (
        userInformation.password?.toString().toLowerCase() !==
        userInformation.confirmPassword?.toString().toLowerCase()
      ) {
        // confirmAlert({
        //   title: "Careful!",
        //   message: "Password and Confirm Password does not match.",
        //   buttons: [
        //     {
        //       label: "OK",
        //     },
        //   ],
        // });
      } else {
        const endpoint = `http://localhost:8000/api/v1/users/register`;
        axios
          .post(endpoint, userInformation)
  
          .then((response) => {
            if (response.status === 201) {
              onSuccess();
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 409) {
            //   confirmAlert({
            //     title: "Error!",
            //     message: "User name or email already registered.",
            //     buttons: [
            //       {
            //         label: "OK",
            //       },
            //     ],
            //   });
            }
          });
      }
    };
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate={false}
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="userName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                />
              </Grid>
  
              <Grid item xs={12}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
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
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  type="text"
                  name="country"
                  autoComplete="country"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="interests"
                  label="Interests"
                  name="interests"
                  autoComplete="interests"
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" required />
                  }
                  label="I agree with the terms and conditions."
                />
              </Grid>
            </Grid>
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/users/signin">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
  
