import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import apiClient from "../axiosConfig";


const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  

  const handleForgotPassword = async () => {
    setMessage(null);
    setError(null);
  
    try {
          //Send a POST request to the backend
      const response = await apiClient.post("/user/forgot-password", { email });
      setMessage(response.data.message); //Display success message
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };
  

  return (
    <Box className="login-page">
      <Box className="login-box">
        <Typography variant="h4" className="login-title">
          Forgot Password
        </Typography>
        <Typography>Enter your email to reset your password</Typography>

        {message && <Typography color="success">{message}</Typography>}

        {error && <Typography color="error">{error}</Typography>}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="login-button"
          onClick={handleForgotPassword}
        >
          Reset Password
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
