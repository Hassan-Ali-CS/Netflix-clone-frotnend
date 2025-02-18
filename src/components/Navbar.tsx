import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaFilm, FaSearch, FaHeart } from "react-icons/fa";
import axios from "axios";
import "./Navbar.css";
import MovieModal from "../components/MovieModal";

const Navbar: React.FC<any> = ({ onMovieClick }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Toggle search bar visibility
  const toggleSearch = () => setSearchOpen(!searchOpen);

  // Handle search input
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      try {
        const response = await axios.get(
          `http://localhost:4000/movie/search?keyword=${query}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Handle movie click from search results
  const handleMovieClickFromSearch = (movie: any) => {
    onMovieClick(movie); // Trigger the function passed from Movies.tsx
    setModalOpen(true);
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        {/* Left Side: Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className="navbar-logo"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          <FaFilm className="navbar-icon" />
          Netflix
        </Typography>

        {/* Middle: Navigation Links */}
        <Box className="navbar-links">
          <Button
            component={Link}
            to="/movies"
            color="inherit"
            className="navbar-link"
            startIcon={<FaFilm />}
          >
            Movies
          </Button>
          <Button
            component={Link}
            to="/favouritemovies"
            color="inherit"
            className="navbar-link"
            startIcon={<FaHeart />}
          >
            My List
          </Button>
        </Box>

        {/* Search Icon */}
        <IconButton color="inherit" onClick={toggleSearch} className="search-icon">
          <FaSearch />
        </IconButton>

        {/* Search Bar */}
        {searchOpen && (
          <Box className="search-container">
            <TextField
              className="search-bar"
              variant="outlined"
              placeholder="Search movies..."
              size="small"
              value={searchQuery}
              onChange={handleSearch}
              autoFocus
            />

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <Paper className="search-dropdown">
                {searchResults.map((movie) => (
                  <Link
                    key={movie.id}
                    to="#"
                    className="search-result"
                    onClick={() => handleMovieClickFromSearch(movie)} // Pass movie to onMovieClick
                  >
                    {movie.title}
                  </Link>
                ))}
              </Paper>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
