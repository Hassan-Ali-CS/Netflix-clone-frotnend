import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Grid, Checkbox, Snackbar, Alert, Button, } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Subscription: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  // Fetch subscriptions from the backend
  useEffect(() => {
    axios
      .get("http://localhost:4000/subscriptions")
      .then((res) => setSubscriptions(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle Subscription Selection
  const handleSelectSubscription = (id: number) => {
    setSelectedSubscription(id);
  };

  // Handle Next Button Click
  const handleNext = () => {
    if (!selectedSubscription) {
      setSnackbarMessage("Please select a subscription!");
      setSnackbarOpen(true);
      return;
    }

    const userId = localStorage.getItem("userId");
    if(!userId) {
        setSnackbarMessage("User not found. Please try again.");
        setSnackbarOpen(true);
        return;
    }

    axios
      .post(`http://localhost:4000/subscriptions/${selectedSubscription}/subscribe/${userId}`)
      .then(() => {
        setSnackbarMessage("Subscription added successfully!");
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/movies"); // Redirect to movies page
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        setSnackbarMessage("Failed to add subscription. Try again.");
        setSnackbarOpen(true);
      });
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ padding: "2rem", flex: 1, overflowY: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Select a Subscription
        </Typography>

        <Grid container spacing={3}>
          {/* Display Subscriptions */}
          {subscriptions.map((sub) => (
            <Grid item xs={12} sm={6} md={4} key={sub.id}>
              <Card
                sx={{
                  border:
                    selectedSubscription === sub.id
                      ? "2px solid #1976d2"
                      : "1px solid #ccc",
                }}
              >
                <CardContent>
                  <Typography variant="h6">Plan: {sub.plan}</Typography>
                  <Typography>Price: ${sub.price}</Typography>
                  <Typography>Duration: {sub.duration} days</Typography>
                  <Checkbox
                    checked={selectedSubscription === sub.id}
                    onChange={() => handleSelectSubscription(sub.id)}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Fixed Next Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "0.5rem",
          backgroundColor: "transparent",
          boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: "1rem",
            padding: "0.5rem 2rem",
            borderRadius: "8px",
          }}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={selectedSubscription ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Subscription;
