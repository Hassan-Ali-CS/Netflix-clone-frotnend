import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Button, TextField, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { FaFilm, FaSearch, FaHeart } from "react-icons/fa";
import axios from "axios";
import MovieModal from "../components/MovieModal";

const Navbar: React.FC<any> = ({ onMovieClick }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  
  const toggleSearch = () => setSearchOpen(!searchOpen);

  
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

  
  const handleMovieClickFromSearch = (movie: any) => {
    onMovieClick(movie); 
    setModalOpen(true);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "red", zIndex: 10 }}>
      <Toolbar>
        
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaFilm style={{ marginRight: 1 }} />
          Netflix
        </Typography>

        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            component={Link}
            to="/movies"
            color="inherit"
            sx={{ marginRight: 2 }}
            startIcon={<FaFilm />}
          >
            Movies
          </Button>
          <Button
            component={Link}
            to="/favouritemovies"
            color="inherit"
            sx={{ marginRight: 2 }}
            startIcon={<FaHeart />}
          >
            My List
          </Button>
        </Box>

        
        <IconButton color="inherit" onClick={toggleSearch}>
          <FaSearch />
        </IconButton>

        
        {searchOpen && (
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <TextField
              variant="outlined"
              placeholder="Search movies..."
              size="small"
              value={searchQuery}
              onChange={handleSearch}
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                padding: 1,
                width: 200,
              }}
              autoFocus
            />

            
            {searchResults.length > 0 && (
              <Paper sx={{ position: "absolute", top: "100%", left: 0, width: "100%", background: "#222", color: "white", padding: "5px 0", borderRadius: 1, maxHeight: 200, overflowY: "auto", zIndex: 1000 }}>
                {searchResults.map((movie) => (
                  <Link
                    key={movie.id}
                    to="#"
                    onClick={() => handleMovieClickFromSearch(movie)}
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "red",
                      textDecoration: "none",
                      transition: "background 0.3s",
                    }}
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
