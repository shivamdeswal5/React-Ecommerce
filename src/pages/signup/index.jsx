import React, { useState } from 'react';
import Box from '@mui/material/Box';
import coverImg from '../../assets/img/image.png';
import {
  Typography, Grid, Stack, TextField, FormControlLabel,
  Checkbox, FormGroup, Button, Divider, MenuItem, Select, InputLabel, FormControl
} from '@mui/material'; 
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import useLocalStorage from '../../hoooks/useLocalStorage'; 

export default function Signup() {
  const initialUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "customer", 
  };

  const [data, setData] = useState(initialUser);
  const [users, setUsers] = useLocalStorage("registeredUsers", []);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.firstName || !data.email || !data.password) {
      alert("Please fill all required fields.");
      return;
    }

    const isEmailExist = users.some((user) => user.email === data.email);
    if (isEmailExist) {
      alert("User already exists with this email.");
      return;
    }

    setUsers([...users, data]);
    alert("Signup Successful");
    navigate("/login");
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
        gridTemplateColumns: 'repeat(2, 1fr)',
      }}
    >
      <Box display={{ xs: 'none', lg: 'block' }}>
        <img src={coverImg} alt="coverimg" />
      </Box>

      <Stack direction="column" spacing={4}>
        <Typography variant="h3">Create an Account</Typography>
        <Box sx={{ color: 'gray' }}>
          Already have an account? <a href="/login">Log in</a>
        </Box>

        <form className={style["form-class"]} onSubmit={handleSubmit}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
            <TextField
              label="First Name"
              variant="filled"
              name="firstName"
              onChange={handleInput}
              className={style.changeColor}
              InputLabelProps={{ style: { color: 'rgba(160, 160, 160, 0.842)' } }}
              InputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Last Name"
              variant="filled"
              name="lastName"
              onChange={handleInput}
              className={style.changeColor}
              InputLabelProps={{ style: { color: 'rgba(160, 160, 160, 0.842)' } }}
              InputProps={{ style: { color: 'white' } }}
            />
          </Stack>

          <TextField
            required
            label="Email"
            name="email"
            onChange={handleInput}
            className={style.changeColor}
            InputLabelProps={{ style: { color: 'rgba(160, 160, 160, 0.842)' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            label="Enter Password"
            name="password"
            onChange={handleInput}
            className={style.changeColor}
            InputLabelProps={{ style: { color: 'rgba(160, 160, 160, 0.842)' } }}
            InputProps={{ style: { color: 'white' } }}
            fullWidth
          />

          {/* Role Selection Dropdown (Customer / Vendor) */}
          <FormControl fullWidth variant="filled" sx={{ marginBottom: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              name="role"
              value={data.role}
              onChange={handleInput}
              className={style.changeColor}
              sx={{ color: 'white' }}
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="vendor">Vendor</MenuItem>
            </Select>
          </FormControl>


          <Button
            variant="outlined"
            sx={{ color: 'white', backgroundColor: '#7055b5', border: '0px' }}
            type="submit"
          >
            Create Account
          </Button>
        </form>

      </Stack>
    </Grid>
  );
}
