import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './Home.css';

const LandingPage: React.FC = () => {      //Functional Component
    const navigate = useNavigate();
    return (
        <Box className="landing-page">
            <Box className="landing-box">
                <Typography variant="h4" gutterBottom className="landing-title">
                    Welcome to Netlfix
                </Typography>
                <Button variant="contained" color="primary" className="landing-button" onClick={()=>navigate('/Login')}>Login</Button>
                <Button variant="contained" color="primary" className="landing-button" onClick={()=>navigate('./Signup')}>Signup</Button>
            </Box>
        </Box>
    );
};

export default LandingPage;