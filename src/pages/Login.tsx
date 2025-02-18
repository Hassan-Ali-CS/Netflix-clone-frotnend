import React, { useState } from "react";
import { Box, Button, TextField, Typography, FormControlLabel, Checkbox } from "@mui/material";
import apiClient from "../axiosConfig";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Checkbox to determine admin login
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null); // Clear any previous error message
    try {
      if (isAdmin) {
        // Attempt Admin Login
        const adminResponse = await apiClient.post("admin/login", { email, password });
        console.log("Admin Login Successful", adminResponse.data);
        // Save admin token and navigate to AdminPanel
        localStorage.setItem("token", adminResponse.data.token);
        navigate("/admin"); // Redirect to admin panel
      } else {
        // Attempt User Login
        const userResponse = await apiClient.post("user/login", { email, password });
        console.log("User Login Successful", userResponse.data);
        console.log("User Login Response", userResponse);
        if (!userResponse.data || !userResponse.data.userId) {
          console.error("Error: userId is missing in response");
          setError("Login failed: No userId received from server.");
          return;
      }
        // Save userId and token and navigate to Movies
        localStorage.setItem("token", userResponse.data.token);
        localStorage.setItem("userId", String(userResponse.data.userId));
        navigate("/movies");
      }
    } catch (err: any) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data.message || "Invalid email or password");
    }
  };

  return (
    <Box className="login-page">
      <Box className="login-box">
        <Typography variant="h4" className="login-title" gutterBottom>
          LOGIN
        </Typography>
        <Typography className="login-para" gutterBottom>
          Please Login to continue
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button variant="contained" color="primary" fullWidth className="login-button" onClick={handleLogin}>
          LOGIN
        </Button>
        <Typography className="forgot-password">
        <Link to="/forgot-password">Forgot Password?</Link>
        </Typography>
        <Box className="login-footer">
          <FormControlLabel
            control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />}
            label="Admin"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
