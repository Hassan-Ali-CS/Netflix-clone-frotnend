import React from "react";
import { Box, Typography } from "@mui/material";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

const AdminPanel: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AdminNavbar />
      <Box
        sx={{
          flex: 1,
          padding: "2rem",
          backgroundColor: "#e44444",
          textAlign: "center",
          paddingTop: "12rem",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
          Welcome to the Admin Panel
        </Typography>
        <Typography>
          Select from the Navbar to perform actions.
        </Typography>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminPanel;
