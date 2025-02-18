import React, { useState, useEffect } from "react";
import { IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import Carousel from "../components/Carousel"; // Import the Carousel component
import MovieCard from "../components/MovieCard"; // Import the MovieCard component
import MovieModal from "../components/MovieModal"; // Import the MovieModal component
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import apiClient from "../axiosConfig"; // Import API client to fetch movies
import './Movies.css'; 

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]); // To store the list of movies
  const [latestMovies, setLatestMovies] = useState<any[]>([]); // To store the last 3 movies
  const [userList, setUserList] = useState<any[]>([]); // User's favorite movies
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null); // To store the selected movie for modal
  const [modalOpen, setModalOpen] = useState(false); // To control the modal open/close
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // State to handle video play
  const [videoUrl, setVideoUrl] = useState<string>(""); // Store the video URL to be played
  const userId = Number(localStorage.getItem("userId")); // Get user ID from local storage

  useEffect(() => {
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await apiClient.get("/movie");
        setMovies(response.data);
        setLatestMovies(response.data.slice(0, 3)); // Get the last 3 movies
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
    setModalOpen(true); // Open the movie modal
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMovie(null); // Reset the selected movie when closing the modal
    setIsVideoPlaying(false); // Stop the video when modal is closed
  };

  const handlePlay = (videoUrl: string) => {
    setVideoUrl(videoUrl); // Set the video URL
    setIsVideoPlaying(true); // Display the video div
    setModalOpen(false); // Close the movie modal when the video is playing
  };

  const handleCloseVideo = () => {
    setIsVideoPlaying(false); // Hide the video div
    setVideoUrl(""); // Clear the video URL
    setModalOpen(true); // Optionally, reopen the modal after video is closed
  };

  return (
    <div className="movies-page">
      <Navbar />

      {/* Carousel Component */}
      <Carousel />

      {/* Empty div to provide space between Carousel and Movie Cards */}
      <div style={{ height: "30px" }}></div>

      {/* MovieCard Component: Displays a list of movies */}
      <div className="movies-container">
        <h2>All Movies</h2>
        <div className="movies-grid">
          {movies.length && movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleMovieClick(movie)} // Open the modal on click
            />
          ))}
        </div>
      </div>

      {/* Movie Modal Component */}
      {selectedMovie && (
        <MovieModal
          open={modalOpen}
          onClose={handleCloseModal}
          movie={selectedMovie}
          userId={userId}
          onPlay={handlePlay} // Pass the video play handler
        />
      )}

      {/* Video Player Div */}
      {isVideoPlaying && videoUrl && (
        <div className="video-container">
          <div className="video-close-btn">
            <IconButton onClick={handleCloseVideo} sx={{ color: "white" }}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </div>
          <video width="100%" height="100%" controls autoPlay>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Movies;
