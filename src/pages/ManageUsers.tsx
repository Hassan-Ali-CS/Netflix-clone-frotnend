import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";
import AdminNavbar from "../components/AdminNavbar";

const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);

    //Fetch Users from backend
    useEffect(() => {
        axios
            .get("http://localhost:4000/admin/users", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    }, []);

    //Block User Function
    const handleBlockUser = (userId: number) => {
        axios
            .delete(`http://localhost:4000/admin/users/${userId}`, {
                headers: {Authorization : `Bearer ${localStorage.getItem("token")}` },
            })
            //update users list after blocking
            .then(() => {
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                alert("User access blocked successfully.");
            })
            .catch((err) => console.error(err));
    };

    return (
        <Box>
            {/* Admin Navbar */}
            <AdminNavbar />

            {/* Page Content */}
            <Box sx={{ padding: "2rem" }}>
                <Typography variant="h4" gutterBottom>
                    Manage Users
                </Typography>

                {/* User Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Subscription</strong></TableCell>
                                <TableCell><strong>Created At</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.subscription?.plan || "None"}</TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleBlockUser(user.id)}
                                        >
                                            Block
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
    
};

export default ManageUsers;