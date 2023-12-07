import "./Signup.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  function handleNavigateLogin() {
    navigate("/login");
  }
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const date = new Date();
  const today =
    date.getFullYear() +
    "-" +
    (date.getMonth() < 10 ? "0" : "") +
    date.getMonth() +
    "-" +
    (date.getDay() < 10 ? "0" : "") +
    date.getDay();
  const [birthDate, setBirthDate] = useState(today);
  const [secondPassword, setSecondPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [city, setCity] = useState("");

  function getAge(birthday) {
    let years =
      today.substring(0, 4).valueOf() -
      String(birthday).substring(0, 4).valueOf();
    let months =
      today.substring(5, 7).valueOf() -
      String(birthday).substring(5, 7).valueOf();
    let days =
      today.substring(8).valueOf() - String(birthday).substring(8).valueOf();
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
    }
    return years;
  }

  const handleSignup = async () => {
    try {
      const formattedBirthDate = birthDate + " 00:00:00";
      const response = await axios.post(
        "http://localhost:8080/gobooking/user/signup",
        null,
        {
          params: {
            name: name,
            surname: lastName,
            birthdate: formattedBirthDate,
            email: email,
            password: password,
            city: city,
          },
        }
      );
      // Handle the response here
      console.log("Signup success", response.data);
      handleNavigateLogin();
    } catch (error) {
      // Handle signup failure
      if (error.response && error.response.data) {
        console.log("Signup error", error.response.data);
      } else {
        console.log("Signup error", error.message);
      }
    }
  };

  return (
    <div className="Signup">
      <img
        src="./logo.png"
        className="logoSignUp"
        alt="GoBooking-logo"
        margin="150px"
      />
      <header className="Signup-header">GoBooking</header>
      <br></br>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="name">Name</InputLabel>
        <OutlinedInput
          id="name-field"
          type={"name"}
          value={name}
          label="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <br></br>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <OutlinedInput
          id="last-name-field"
          type={"lastName"}
          value={lastName}
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>
      <br></br>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="birthDate">Birth Date</InputLabel>
        <OutlinedInput
          id="birthdate-field"
          type="date"
          value={birthDate}
          label="Birth Date"
          onChange={(newValue) => setBirthDate(newValue.target.value)}
        />
      </FormControl>
      <br></br>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="city">City</InputLabel>
        <Select
          id="city-field"
          value={city}
          label="City"
          onChange={(e) => setCity(e.target.value)}
        >
          <MenuItem value="">Select a city</MenuItem>
          <MenuItem value="Adana">Adana</MenuItem>
          <MenuItem value="Antalya">Antalya</MenuItem>
          <MenuItem value="Ankara">Ankara</MenuItem>
          <MenuItem value="Bursa">Bursa</MenuItem>
          <MenuItem value="Gaziantep">Gaziantep</MenuItem>
          <MenuItem value="İstanbul">İstanbul</MenuItem>
          <MenuItem value="İzmir">İzmir</MenuItem>
          <MenuItem value="Kayseri">Kayseri</MenuItem>
          <MenuItem value="Konya">Konya</MenuItem>
          <MenuItem value="Mersin">Mersin</MenuItem>

          {/* Add more cities here */}
        </Select>
      </FormControl>
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
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <TextField
          id="second-password-field"
          label="Password(Again)"
          variant="outlined"
          margin="dense"
          type={showPassword ? "text" : "password"}
          value={secondPassword}
          helperText={
            (password !== secondPassword ? "Passwords should match" : "") ||
            (getAge(birthDate) < 18 || getAge(birthDate > 150)
              ? "Your age must be at least 18!"
              : "")
          }
          onChange={(e) => setSecondPassword(e.target.value)}
        />
      </FormControl>
      <br></br>
      <br></br>
      <Button
        className="Login-button"
        variant="contained"
        onClick={() => {
          if (
            getAge(birthDate) > 18 &&
            getAge(birthDate) < 150 &&
            password !== "" &&
            email !== "" &&
            name !== "" &&
            lastName !== "" &&
            password === secondPassword
          ) {
            handleSignup();
            setClicked(!clicked);
          }
        }}
        style={{ backgroundColor: clicked ? "#01228B" : "#0122BB" }}
      >
        Signup
      </Button>
    </div>
  );
}
