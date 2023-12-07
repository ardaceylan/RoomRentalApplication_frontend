import "./UserProfile.css";
import React, { useState, useEffect } from "react";
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
import Footer from "../../common_components/Footer";
import Navbar from "../../common_components/NavbarAppUser";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();
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
  const [taxNo, setTaxNo] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [city, setCity] = useState("");

  const handleSaveChange = async () => {
    try {
      const responseAppUser = await axios.put(
        `http://localhost:8080/gobooking/appuser/${id}`,
        null,
        {
          params: {
            appUserId: id,
            name: name,
            surname: lastName,
            birthdate: birthDate,
            password: password,
          },
        }
      );
      const responseCity = await axios.put(
        `http://localhost:8080/gobooking/appuser/update_city/${id}`,
        null,
        {
          params: {
            appUserId: id,
            city: city,
          },
        }
      );
      const responseTaxNo = await axios.put(
        `http://localhost:8080/gobooking/appuser/update_tax_number/${id}`,
        null,
        {
          params: {
            appUserId: id,
            taxNumber: taxNo,
          },
        }
      );
      console.log("User info succesfully updated");
    } catch (error) {
      // Handle save change failure
      if (error.response && error.response.data) {
        console.log("Update user error", error.response.data);
      } else {
        console.log("Update user error", error.message);
      }
    }
  };

  const fetchUserData = async () => {
    try {
      const fetchUser = await axios.get(
        `http://localhost:8080/gobooking/user/id/${id}`,
        null
      );
      const userData = fetchUser.data;
      setName(userData.name);
      setLastName(userData.surname);
      setEmail(userData.email);
      setPassword(userData.password);
      setBirthDate(userData.birthDate.substring(0, 10));
    } catch (error) {
      // Handle fetch failure
      if (error.response && error.response.data) {
        console.log("User data fetch error", error.response.data);
      } else {
        console.log("User data fetch error", error.message);
      }
    }
  };

  const fetchAppUserData = async () => {
    try {
      const fetchAppUser = await axios.get(
        `http://localhost:8080/gobooking/appuser/${id}`,
        null
      );
      const appUserData = fetchAppUser.data;
      setCity(appUserData.city);
      setTaxNo(appUserData.taxNumber);
    } catch (error) {
      // Handle fetch failure
      if (error.response && error.response.data) {
        console.log("App user data fetch error", error.response.data);
      } else {
        console.log("App user data fetch error", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    fetchAppUserData();
  }, []);

  return (
    <div>
      <Navbar id={id}/>
      <div className="Signup">
        <img
          src="../user_profile.jpg"
          className="logoMP"
          alt="GoBooking-logo"
          margin="150px"
        />
        <header className="Signup-header">User Profile</header>
        <br></br>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="name">Name</InputLabel>
          <OutlinedInput
            id="name-field"
            type={"name"}
            value={name || ""}
            label="Name"
            readOnly
            //onChange={e => setName(e.target.value)}
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
            readOnly
          />
        </FormControl>
        <br></br>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="birthDate">Birth Date</InputLabel>
          <OutlinedInput
            id="birthdate-field"
            type="date"
            value={birthDate || today}
            label="Birth Date"
            readOnly
          />
        </FormControl>
        <br></br>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="city">City</InputLabel>
          <Select
            id="city-field"
            value={city || ""}
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
          </Select>
        </FormControl>
        <br></br>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email-field"
            type={"email"}
            value={email || ""}
            label="Email"
            readOnly
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
            value={password || ""}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <br></br>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <TextField
            id="tax-no-field"
            label="Tax Number"
            variant="outlined"
            margin="dense"
            value={taxNo || ""}
            onChange={(e) => setTaxNo(e.target.value)}
          />
        </FormControl>
        <br></br>
        <br></br>
        <Button
          className="Login-button"
          variant="contained"
          onClick={() => {
            handleSaveChange();
            setClicked(!clicked);
          }}
          style={{ backgroundColor: clicked ? "#01228B" : "#0122BB" }}
        >
          Save Changes
        </Button>
      </div>
      <Footer />
    </div>
  );
}
