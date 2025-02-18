import React from "react";
import { Box } from "@mui/material";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import "./AdminPanel.css";

const AdminPanel: React.FC = () => {
  return (
    <Box className="admin-panel">
      <AdminNavbar />
      <Box className="admin-content">
        <h1>Welcome to the Admin Panel</h1>
        <p>Select from the Navbar to perform actions.</p>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminPanel;
