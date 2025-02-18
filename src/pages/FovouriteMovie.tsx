import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard'; // MovieCard to display movies
import MovieModal from '../components/MovieModal'; // MovieModal to show movie details
import apiClient from '../axiosConfig'; // API client to fetch user favorites
import Footer from '../components/Footer'; // Footer component
import './Movies.css'; 

const FavoriteMoviesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]); // To store the user's favorite movies
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

    const fetchFavorites = async () => {
      try {
        const response = await apiClient.get(`/user/${userId}/favourites`);
        setFavorites(response.data || []); // Get the user's favorite movies
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie);
    setModalOpen(true); // Open the movie modal
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMovie(null); // Reset the selected movie when closing the modal
  };

  const handlePlay = (videoUrl: string) => {
    setVideoUrl(videoUrl); // Set the video URL
    setIsVideoPlaying(true); // Display the video div
  };

  const handleCloseVideo = () => {
    setIsVideoPlaying(false); // Hide the video div
    setVideoUrl(""); // Clear the video URL
  };

  return (
    <div className="movies-page">
      <Navbar /> {/* Reuse Navbar component */}

      <Box sx={{ p: 2 }}>
        <h2>My Favorite Movies</h2>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 2 }}>
          {favorites.length > 0 ? (
            favorites.map((movie) => (
              <Box key={movie.id} sx={{ position: 'relative', margin: '10px' }}>
                <MovieCard movie={movie} onClick={() => handleMovieClick(movie)} />
              </Box>
            ))
          ) : (
            <p>No favorite movies found.</p>
          )}
        </Box>
      </Box>

      {/* Movie Modal Component */}
      <MovieModal
        open={modalOpen}
        userId={userId}
        onClose={handleCloseModal}
        movie={selectedMovie}
        onPlay={handlePlay} // Pass the video play handler
      />

      {/* Video Player Div */}
      {isVideoPlaying && videoUrl && (
        <div className="video-container">
          <div className="video-close-btn">
            <Button onClick={handleCloseVideo} sx={{ color: "white" }}>Close</Button>
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

export default FavoriteMoviesPage;
