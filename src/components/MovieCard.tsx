import React from 'react';
import { Card, CardMedia, CardContent, Typography, Rating } from '@mui/material';

interface MovieCardProps {
  movie: any; // Movie object with properties such as title, imageUrl, and rating
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <Card 
      sx={{
        width: 230, // Adjust width for rectangular shape
        cursor: 'pointer',
        backgroundColor: 'black', 
        marginBottom: '16px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
        }
      }} 
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="280" // Adjust the height of the movie image
        image={movie.imageUrl}
        alt={movie.title}
        sx={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      />
      <CardContent sx={{ padding: '10px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px', color: 'white' }}>
          {movie.title}
        </Typography>
        <Rating name="read-only" value={movie.rating} readOnly precision={0.1} />
      </CardContent>
    </Card>
  );
};

export default MovieCard;
