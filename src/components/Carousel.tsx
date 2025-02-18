import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography } from '@mui/material';
import apiClient from '../axiosConfig';

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
}

const Carousel: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await apiClient.get('/movie');
        // Sort movies by ID in descending order and slice the first 3
        const sortedMovies = response.data.sort((a: Movie, b: Movie) => b.id - a.id).slice(0, 3);
        setMovies(sortedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Slide change every 5 seconds
    arrows: false,
  };

  return (
    <div>
        <Box sx={{ width: '100%', mt: 2 }}>
            <Slider {...settings}>
                {movies.map((movie) => (
                    <Box key={movie.id} sx={{ textAlign: 'center' }}>
                        <img src={movie.imageUrl} alt={movie.title} style={{ width: '1500px', height: '600px', objectFit: 'cover' }} />
                        <Typography variant="h3" sx={{ 
                            position:'absolute',
                            top:'10px',
                            mt: 2, 
                            color: 'white', 
                            fontWeight: 'Bold',
                            paddingLeft: '20px' }}>
                        {movie.title}
                        </Typography>
                    </Box>
                ))}
            </Slider>
        </Box>
    </div>
  );
};

export default Carousel;
