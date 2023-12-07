import "./Login.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  function handleNavigatePS(navigatedId) {
    navigate(`/property_search/${navigatedId}`);
  }
  
  function handleNavigateAD(navigatedId) {
    navigate(`/admin_dashboard/${navigatedId}`);
  }
  
  const fetchUserId = async (direction) => {
    
    try {
      
      const response = await axios.get(
        `http://localhost:8080/gobooking/user/email/${email}`
      );
      console.log("response.data.id:", response.data.id);
      if (direction === "redirect:/home") {
        console.log("calling handleNaviagatePS", response.data.id);
        handleNavigatePS(response.data.id);
      } else if (direction === "redirect:/admin_dashboard") {
        console.log("calling handleNaviagateAD", response.data.id);
        handleNavigateAD(response.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Rest of the code...

const handleLogin = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/gobooking/user/login",
      null,
      {
        params: {
          email: email,
          password: password,
        },
      }
    );
    if (response.data) {
      console.log("response.data: ", response.data);
      if (response.data === "redirect:/home") {
        console.log("Login success", response.data);
        fetchUserId(response.data);
      } else if (response.data === "redirect:/admin_dashboard") {
        console.log("Login success", response.data);
        fetchUserId(response.data);
      }
    } else {
      console.log("Login response data is undefined");
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.log("Login error", error.response.data);
    } else {
      console.log("Login error", error.message);
    }
  }
};

  return (
    <div className="Login">
      <img
        src="./logo.png"
        className="logoL"
        alt="GoBooking-logo"
        margin="150px"
      />
      <header className="Login-header">GoBooking</header>
      <br></br>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput
          id="email-field"
          type={"email"}
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <br></br>
      <br></br>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password-field"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show) => !show)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <br></br>
      <Link
        className="Login-link"
        onClick={() => {
          console.log("Clicked");
        }}
      >
        Forget Password?
      </Link>
      <br></br>
      <br></br>
      <Button
        className="Login-button"
        variant="contained"
        onClick={() => {
          handleLogin();        
        }}
      >
        Login
      </Button>
    </div>
  );
}
