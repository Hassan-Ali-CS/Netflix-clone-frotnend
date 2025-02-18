import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar: React.FC = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AppBar position="static" className="admin-navbar">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button color="inherit" component={Link} to="/admin/users">
          Manage Users
        </Button>
        <Button color="inherit" component={Link} to="/admin/subscriptions">
          Manage Subscriptions
        </Button>
        <Button color="inherit" component={Link} to="/admin/movies">
          Manage Movies
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
