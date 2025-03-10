import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => { // Functional Component
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundImage: "url('https://netflixcloneprojectat.s3.eu-north-1.amazonaws.com/images/Netflix_LinkdinHeader_N_Texture_5.png')",
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
          textAlign: "center",
          color: "white",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
          Welcome to Netlfix
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "1.5rem" }}
          onClick={() => navigate('/Login')}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "1.5rem" }}
          onClick={() => navigate('./Signup')}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
