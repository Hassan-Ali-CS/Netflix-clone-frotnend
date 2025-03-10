import React, { useState } from "react";
import { Box, Button, TextField, Typography, Modal, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; 
import apiClient from "../axiosConfig";

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
            
            localStorage.setItem("userId", response.data.user.id);
            
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
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
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
                    boxShadow: "0 4px 15px rgba(194, 83, 83, 0.2)",
                    width: "100%",
                    maxWidth: "400px",
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: "1rem", color: "aliceblue" }} gutterBottom>
                    SIGNUP
                </Typography>
                <Typography sx={{ marginBottom: "1rem", color: "aliceblue" }} gutterBottom>
                    Create an account to continue
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginBottom: "1rem",
                        backgroundColor: "aliceblue",
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                    onClick={handleSignup}
                >
                    Create Account
                </Button>

                
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

            
            <Modal open={verificationModalOpen} onClose={() => setVerificationModalOpen(false)}>
                <Box
                    sx={{
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
                        textAlign: "center",
                    }}
                >
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
                    <Button variant="contained" color="primary" fullWidth onClick={handleVerifyCode}>
                        Verify
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default Signup;
