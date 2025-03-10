import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import apiClient from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>(); 
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  
  const handleResetPassword = async () => {
    setMessage(null);
    setError(null);

    if(!token) {
      setError("Invalid or missing reset token");
      return;
    }

    try {
          
        const response = await apiClient.post(`user/reset-password/${token}`, { password });
        setMessage(response.data.message);  
        setTimeout(() => navigate("/login"), 2000); 
    } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong!");
    }
};


  return (
    <Box className="login-page">
      <Box className="login-box">
        <Typography variant="h4" className="login-title">
          Reset Password
        </Typography>
        <Typography>Enter your new password below</Typography>

        {message && <Typography color="success">{message}</Typography>}

        {error && <Typography color="error">{error}</Typography>}

        <TextField
          label="New Password"
          variant="outlined"
          fullWidth
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="login-button"
          onClick={handleResetPassword}
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
