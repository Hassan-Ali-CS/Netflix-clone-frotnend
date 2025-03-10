import React, { useState, useEffect } from "react";
import { IconButton, Box, Typography, Grid, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Carousel from "../components/Carousel"; 
import MovieCard from "../components/MovieCard"; 
import MovieModal from "../components/MovieModal"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import apiClient from "../axiosConfig"; 

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]); 
  const [latestMovies, setLatestMovies] = useState<any[]>([]); 
  const [userList, setUserList] = useState<any[]>([]); 
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null); 
  const [modalOpen, setModalOpen] = useState(false); 
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); 
  const [videoUrl, setVideoUrl] = useState<string>(""); 
  const userId = Number(localStorage.getItem("userId")); 

  useEffect(() => {
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await apiClient.get("/movie");
        setMovies(response.data);
        setLatestMovies(response.data.slice(0, 3)); 
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchUserList = async () => {
      try {
        const response = await apiClient.get(`/user/${userId}/favourites`);
        setUserList(response.data || []); // Get the user's favorite movies
      } catch (error) {
        console.error("Error fetching user movie list:", error);
      }
    };

    fetchMovies();
    fetchUserList();
  }, [userId]);

  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie);
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMovie(null); 
    setIsVideoPlaying(false); 
  };

  const handlePlay = (videoUrl: string) => {
    setVideoUrl(videoUrl); 
    setIsVideoPlaying(true); 
    setModalOpen(false); 
  };

  const handleCloseVideo = () => {
    setIsVideoPlaying(false); 
    setVideoUrl(""); 
    setModalOpen(true); 
  };

  return (
    <Box sx={{ backgroundColor: "#121212", color: "white", minHeight: "100vh" }}>
      <Navbar />

      
      <Carousel />

      
      <Box sx={{ height: "30px" }}></Box>

      
      <Box sx={{ margin: "20px" }}>
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px" }}>
          All Movies
        </Typography>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {movies.length &&
            movies.map((movie) => (
              <Grid item key={movie.id}>
                <MovieCard movie={movie} onClick={() => handleMovieClick(movie)} />
              </Grid>
            ))}
        </Grid>
      </Box>

      
      {selectedMovie && (
        <MovieModal
          open={modalOpen}
          onClose={handleCloseModal}
          movie={selectedMovie}
          userId={userId}
          onPlay={handlePlay} 
        />
      )}

      
      {isVideoPlaying && videoUrl && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Box sx={{ position: "absolute", top: "10px", right: "10px", zIndex: 2000 }}>
            <IconButton onClick={handleCloseVideo} sx={{ color: "white" }}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
          <video width="100%" height="100%" controls autoPlay>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      )}

      <Footer />
    </Box>
  );
};

export default Movies;
