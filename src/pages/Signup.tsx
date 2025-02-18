import React, {useState} from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import apiClient from "../axiosConfig";
import './Signup.css';
import { useNavigate } from "react-router-dom";

const Signup : React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); 

    const handleSignup = async () => {
       try{
        const response = await apiClient.post('/user/signup', { name, email, password });
        console.log('Signup Successfull;', response.data);
        //Store userId in local storage
        localStorage.setItem("userId", response.data.user.id);
        //Redirect
        navigate('/Subscriptions');
       } catch (err:any) {
        console.error('Signup Error:', err.response?.data || err.message);
        setError(err.response?.data.message || 'An Error Occured');
       }
    };

    return (
        <Box className="signup-page">
            <Box className="signup-box">
                <Typography variant="h4" className="signup-title" gutterBottom>SIGNUP</Typography>
                <Typography className="signup-para" gutterBottom>Create an account to continue</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField label="Name" variant="outlined" fullWidth className="signup-input" value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <TextField label="Email" variant="outlined" fullWidth className="signup-input" value={email}
                    onChange={(e) => setEmail(e.target.value)} type="email"/>
                <TextField label="Password" variant="outlined" fullWidth className="signup-input" value={password}
                    onChange={(e) => setPassword(e.target.value)} type="password"/>
                <Button variant="contained" color="primary" fullWidth className="signup-button" onClick={handleSignup}>
                    Create Account
                </Button> 
            </Box>
        </Box>
    )
};

export default Signup;