import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../provider/SnackbarContext";
import { getUserLogin } from "../api/api";
import {
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
} from "@mui/material";
import PSButton from "../components/PSButton";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { openSnackbarLogged, closeSnackbarLogged } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const response = await getUserLogin(username, password);
        if (response.status === 200) {
          navigate("/pets-table");
          openSnackbarLogged();
          setTimeout(closeSnackbarLogged, 2000);
          console.log("User logged successfully");
        } else if (response.status === 400) {
          console.error("Invalid username or password");
        } else {
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChangeUserName = (e) => {
    const { value } = e.target;
    setUsername(value);

    if (!/^[a-zA-Z ]*$/.test(value)) {
      setUserNameError("Please enter a valid name with letters only");
    } else {
      setUserNameError("");
    }
  };

  const validate = () => {
    let isValid = true;

    if (!username.trim()) {
      setUserNameError("User name is required");
      isValid = false;
    } else if (!/^[a-zA-Z ]*$/.test(username)) {
      setUserNameError("Please enter a valid name with letters only");
      isValid = false;
    } else {
      setUserNameError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
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
          Pet Store Sign in
        </h2>

        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleChangeUserName}
            error={!!userNameError}
            helperText={userNameError}
            InputProps={{
              style: { borderColor: userNameError ? "red" : "" },
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              style: { borderColor: passwordError ? "red" : "" },
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <PSButton
            type="submit"
            variant="contained"
            buttonText="Sign In"
            onClick={handleSubmit}
            fullWidth
            style={{ marginTop: "10px", marginBottom: "10px" }}
          />

          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                style={{ color: "black", textDecoration: "none" }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="/sign-up"
                variant="body2"
                style={{ color: "black", textDecoration: "none" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
