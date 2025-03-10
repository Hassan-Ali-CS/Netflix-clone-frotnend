import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AdminNavbar: React.FC = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333", color: "red" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/admin/users"
          sx={{ marginRight: "1rem" }}
        >
          Manage Users
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/admin/subscriptions"
          sx={{ marginRight: "1rem" }}
        >
          Manage Subscriptions
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/admin/movies"
          sx={{ marginRight: "1rem" }}
        >
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
