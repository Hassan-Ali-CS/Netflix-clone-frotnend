import React, { useState } from "react";
import { Box, Button, TextField, Typography, FormControlLabel, Checkbox, IconButton } from "@mui/material";
import apiClient from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; 

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null); 
    try {
      if (isAdmin) {
        
        const adminResponse = await apiClient.post("admin/login", { email, password });
        console.log("Admin Login Successful", adminResponse.data);
        
        localStorage.setItem("token", adminResponse.data.token);
        navigate("/admin"); 
      } else {

        const userResponse = await apiClient.post("user/login", { email, password });
        console.log("User Login Successful", userResponse.data);
        console.log("User Login Response", userResponse);
        if (!userResponse.data || !userResponse.data.userId) {
          console.error("Error: userId is missing in response");
          setError("Login failed: No userId received from server.");
          return;
        }
        
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage:
          "url('https://netflixcloneprojectat.s3.eu-north-1.amazonaws.com/images/Netflix_LinkdinHeader_N_Texture_5.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(194, 83, 83, 0.2)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1rem", color: "aliceblue" }} gutterBottom>
          LOGIN
        </Typography>
        <Typography sx={{ marginBottom: "1rem", color: "aliceblue" }} gutterBottom>
          Please Login to continue
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "1rem",
            backgroundColor: "aliceblue",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "1rem",
            backgroundColor: "aliceblue",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "2rem" }}
          onClick={handleLogin}
        >
          LOGIN
        </Button>
        <Typography sx={{ marginTop: "1rem", color: "white" }}>
          <Link to="/forgot-password" style={{ color: "aliceblue" }}>
            Forgot Password?
          </Link>
        </Typography>
        <Box sx={{ marginTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FormControlLabel
            control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />}
            label="Admin"
            sx={{ color: "white" }}
          />
        </Box>
      </Box>

      
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          color: "white",
        }}
      >
        <FaArrowLeft />
      </IconButton>
    </Box>
  );
};

export default Login;
