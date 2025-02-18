import React, { useState } from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import apiClient from "../axiosConfig"; // API client to make requests to backend

interface MovieModalProps {
  open: boolean;
  onClose: () => void;
  movie: any; // Using `any` for movie data
  userId: number;
  onPlay: (videoUrl: string) => void; // Callback to handle video play
}

const MovieModal: React.FC<MovieModalProps> = ({
  open,
  onClose,
  movie,
  userId,
  onPlay,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToList = async () => {
    try {
      if (isAdded) {
        // Remove from favorites
        await apiClient.delete(`/user/${userId}/favourites/${movie.id}`);
        setIsAdded(false);
      } else {
        // Add to favorites
        await apiClient.post(`/user/${userId}/favourites/${movie.id}`);
        setIsAdded(true);
      }
    } catch (error) {
      console.error("Error adding/removing from favorites:", error);
    }
  };

  if (!movie) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          backgroundColor: 'black',
          width: "60%",
          maxHeight: "90%",
          overflowY: "auto",
          textAlign: "center",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 9, top: 9, color: "whitesmoke" }}
        >
          <CloseIcon />
        </IconButton>

        {/* Movie Image with Play Icon */}
        <Box sx={{ position: "relative" }}>
          <img
            src={movie.imageUrl}
            alt={movie.title}
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          {/* Play Button on Image Hover */}
          <Button
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
            }}
            onClick={() => onPlay(movie.videoUrl)} // Call the onPlay function to play the video
          >
            <PlayArrowIcon fontSize="large" />
          </Button>
        </Box>

        {/* Add to Favorites Button */}
          {/* Add to Favorites Button placed inside a div */}
          <div style={{ marginTop: "10px" }}>
          <IconButton
            onClick={handleAddToList}
            sx={{
              color: "white",
              fontSize: "2.5rem", // Making the button slightly bigger
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
            }}
          >
            {isAdded ? <CheckCircleIcon /> : <AddCircleOutlineIcon />}
          </IconButton>
        </div>

        {/* Movie Details */}
        <Typography variant="h4" sx={{ mt: 2 }}>
          {movie.title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {movie.description}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Release Date:  {movie.releaseDate}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Duration: {movie.duration} mins
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Rating: {movie.rating} /10
        </Typography>

      </Box>
    </Modal>
  );
};

export default MovieModal;
