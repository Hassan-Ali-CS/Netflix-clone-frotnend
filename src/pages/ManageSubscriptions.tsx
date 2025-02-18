import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Modal,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import AdminNavbar from "../components/AdminNavbar";

const ManageSubscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    plan: "",
    price: "",
    duration: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch subscriptions from the backend
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = () => {
    axios
      .get("http://localhost:4000/subscriptions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setSubscriptions(res.data))
      .catch((err) => console.error(err));
  };

  // Handle creating a new subscription
  const handleCreateSubscription = () => {
    if (!newSubscription.plan || !newSubscription.price || !newSubscription.duration) {
      setSnackbarMessage("All fields are required!");
      setSnackbarOpen(true);
      return;
    }

    axios
      .post(
        "http://localhost:4000/subscriptions",
        {
          plan: newSubscription.plan,
          price: parseFloat(newSubscription.price),
          duration: parseInt(newSubscription.duration),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        fetchSubscriptions(); // Refresh the subscriptions list
        setOpenModal(false); // Close the modal
        setNewSubscription({ plan: "", price: "", duration: "" }); // Reset form
        setSnackbarMessage("Subscription created successfully!");
        setSnackbarOpen(true); // Show success message
      })
      .catch((err) => {
        console.error(err);
        setSnackbarMessage("Failed to create subscription. Try again.");
        setSnackbarOpen(true);
      });
  };

  // Handle deleting a subscription
  const handleDeleteSubscription = (id: number) => {
    axios
      .delete(`http://localhost:4000/subscriptions/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        fetchSubscriptions(); // Refresh subscriptions list
        setSnackbarMessage("Subscription deleted successfully!");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error(err);
        setSnackbarMessage("Failed to delete subscription. Try again.");
        setSnackbarOpen(true);
      });
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      {/* Admin Navbar */}
      <AdminNavbar />

      {/* Page Content */}
      <Box sx={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Manage Subscriptions
        </Typography>

        <Grid container spacing={3}>
          {/* Display Existing Subscriptions */}
          {subscriptions.map((sub) => (
            <Grid item xs={12} sm={6} md={4} key={sub.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Plan: {sub.plan}</Typography>
                  <Typography>Price: ${sub.price}</Typography>
                  <Typography>Duration: {sub.duration} days</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteSubscription(sub.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Fixed Button for Adding Subscription */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          zIndex: 1000,
        }}
      >
        + Add New Subscription
      </Button>

      {/* Modal for Creating Subscription */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create Subscription
          </Typography>
          <TextField
            label="Plan"
            fullWidth
            margin="normal"
            value={newSubscription.plan}
            onChange={(e) =>
              setNewSubscription({ ...newSubscription, plan: e.target.value })
            }
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            value={newSubscription.price}
            onChange={(e) =>
              setNewSubscription({
                ...newSubscription,
                price: e.target.value,
              })
            }
          />
          <TextField
            label="Duration (in days)"
            type="number"
            fullWidth
            margin="normal"
            value={newSubscription.duration}
            onChange={(e) =>
              setNewSubscription({
                ...newSubscription,
                duration: e.target.value,
              })
            }
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateSubscription}
            >
              Create
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageSubscriptions;
