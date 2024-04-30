import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../provider/SnackbarContext";
import { postUser } from "../api/api";
import {
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Container,
} from "@mui/material";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PSButton from "../components/PSButton";

function SignUp() {
  const navigate = useNavigate();
  const { openSnackbarUserCreated, closeSnackbarUserCreated } = useSnackbar();

  const [user, setUser] = useState({
    id: 1,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    userStatus: 1,
  });

  const [errors, setErrors] = useState({
    userNameError: "",
    userEmailError: "",
    passwordError: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value, country, e, formattedValue) => {
    setUser((prevUser) => ({
      ...prevUser,
      phone: formattedValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
    let isValid = true;

    if (!user.username.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userNameError: "User Name is required",
      }));
      isValid = false;
    } else if (!/^[a-zA-Z ]*$/.test(user.username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userNameError: "Please enter a valid name with letters only",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userNameError: "",
      }));
    }

    if (!user.email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userEmailError: "User email is required",
      }));
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userEmailError: "Please enter a valid email address",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userEmailError: "",
      }));
    }

    if (!user.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "Password is required",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "",
      }));
    }

    if (!isValid) return;

    const userData = {
      id: 1,
      ...user,
    };

    try {
      const response = await postUser(userData);
      if (response.status === 200) {
        console.log("User created successfully");
        navigate("/pets-table");
        setTimeout(() => {
          openSnackbarUserCreated();
          setTimeout(closeSnackbarUserCreated, 2000);
        }, 0);
      }
    } catch (error) {
      console.error("Error creating user:", error);
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
        <h2 style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/icon.png"
            alt="logo"
            width={25}
            height={25}
            style={{ marginRight: "5px" }}
          />
          Pet Store Sign-Up
        </h2>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="username"
            autoComplete="username"
            value={user.username}
            onChange={handleInputChange}
            error={!!errors.userNameError}
            helperText={errors.userNameError}
            InputProps={{
              style: { borderColor: errors.userNameError ? "red" : "" },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            value={user.firstName}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            value={user.lastName}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={user.email}
            onChange={handleInputChange}
            error={!!errors.userEmailError}
            helperText={errors.userEmailError}
            InputProps={{
              style: { borderColor: errors.userEmailError ? "red" : "" },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user.password}
            onChange={handleInputChange}
            error={!!errors.passwordError}
            helperText={errors.passwordError}
            InputProps={{
              style: { borderColor: errors.passwordError ? "red" : "" },
            }}
          />
          <ReactPhoneInput
            style={{ marginTop: "9px" }}
            country={"us"}
            value={user.phone}
            onChange={handlePhoneChange}
            inputProps={{
              name: "phone",
              required: true,
            }}
          />
          <PSButton
            type="submit"
            variant="contained"
            buttonText="Sign Up"
            onClick={handleSubmit}
            fullWidth
            style={{ marginTop: "10px", marginBottom: "10px" }}
          />

          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                href="/"
                variant="body2"
                style={{ color: "black", textDecoration: "none" }}
              >
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
