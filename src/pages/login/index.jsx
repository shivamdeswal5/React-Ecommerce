import React, { useState } from "react";
import Box from "@mui/material/Box";
import coverImg from "../../assets/img/image.png";
import {
  Typography,
  Grid,
  Stack,
  TextField,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import useLocalStorage from "../../hoooks/useLocalStorage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users] = useLocalStorage("registeredUsers", []);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter all details.");
      return;
    }

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      alert("Login Successful!");

      if (matchedUser.role === "vendor") {
        navigate("/vendor");
      } else {
        navigate("/customer");
      }
    } else {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 10 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      className={style["bg-color"]}
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        gap: "6rem",
        height: "100vh",
      }}
    >
      <Box display={{ xs: "none", lg: "block" }}>
        <img src={coverImg} alt="coverimg" />
      </Box>

      <Stack direction="column" spacing={4}>
        <Typography variant="h3">Log In</Typography>

        <form className={style["form-class"]} onSubmit={handleSubmit}>
          <TextField
            required
            label="Email"
            placeholder="Required"
            className={style.changeColor}
            name="email"
            onChange={handleInput}
            InputLabelProps={{ style: { color: 'rgba(160, 160, 160, 0.842)' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            fullWidth
            label="Enter Password"
            name="password"
            onChange={handleInput}
            className={style.changeColor}
            InputLabelProps={{ style: { color: 'rgba(160, 160, 160, 0.842)' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={
                <Box>
                  I agree to the{" "}
                  <a className={style["line-through"]}>terms and conditions</a>
                </Box>
              }
            />
          </FormGroup>

          <Button
            variant="outlined"
            sx={{ color: "white", backgroundColor: "#7055b5", border: "0px" }}
            type="submit"
          >
            Login In
          </Button>
        </form>
      </Stack>
    </Grid>
  );
}
