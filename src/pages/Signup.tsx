import React, { useState } from "react";
import { Box, Button, TextField, Typography, Modal, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Left Arrow Icon
import apiClient from "../axiosConfig";
import './Signup.css';

const Signup: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [verificationModalOpen, setVerificationModalOpen] = useState(false);
    const [verificationError, setVerificationError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await apiClient.post('/user/signup', { name, email, password });
            console.log('Signup Successful:', response.data);
            // Store userId in local storage
            localStorage.setItem("userId", response.data.user.id);
            // Open the verification modal
            setVerificationModalOpen(true);
        } catch (err: any) {
            console.error('Signup Error:', err.response?.data || err.message);
            setError(err.response?.data.message || 'An Error Occurred');
        }
    };

    const handleVerifyCode = async () => {
        try {
            const response = await apiClient.post(`/user/verify-email/${localStorage.getItem("userId")}`, { code: verificationCode });
            console.log('Verification Success:', response.data);
            setVerificationError(null);
            setVerificationModalOpen(false);
            navigate('/Subscriptions');
        } catch (err: any) {
            console.error('Verification Error:', err.response?.data || err.message);
            setVerificationError('Invalid verification code. Please try again.');
        }
    };

    return (
        <Box className="signup-page">
            <Box className="signup-box">
                <Typography variant="h4" className="signup-title" gutterBottom>SIGNUP</Typography>
                <Typography className="signup-para" gutterBottom>Create an account to continue</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField label="Name" variant="outlined" fullWidth className="signup-input" value={name}
                    onChange={(e) => setName(e.target.value)} />
                <TextField label="Email" variant="outlined" fullWidth className="signup-input" value={email}
                    onChange={(e) => setEmail(e.target.value)} type="email" />
                <TextField label="Password" variant="outlined" fullWidth className="signup-input" value={password}
                    onChange={(e) => setPassword(e.target.value)} type="password" />
                <Button variant="contained" color="primary" fullWidth className="signup-button" onClick={handleSignup}>
                    Create Account
                </Button>

                {/* Back to landing page */}
                <IconButton
                    onClick={() => navigate('/')}
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

            {/* Verification Modal */}
            <Modal open={verificationModalOpen} onClose={() => setVerificationModalOpen(false)}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 4,
                    width: "90vw",
                    maxWidth: 400,
                    maxHeight: "80vh",
                    overflowY: "auto",
                    textAlign: "center"
                }}>
                    <Typography variant="h6">Enter the verification code sent to your email</Typography>
                    <TextField
                        label="Verification Code"
                        variant="outlined"
                        fullWidth
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        sx={{ marginBottom: "1rem" }}
                    />
                    {verificationError && <Typography color="error">{verificationError}</Typography>}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleVerifyCode}
                    >
                        Verify
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default Signup;
