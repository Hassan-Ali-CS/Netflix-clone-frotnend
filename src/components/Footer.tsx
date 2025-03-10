import React from 'react';
import { Container, Box, Typography, Link } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#141414',
        color: '#ffffff',
        padding: '1.5rem 0',
        textAlign: 'center',
        marginTop: 'auto', 
      }}
    >
      <Container
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body2"
          style={{
            fontSize: '0.9rem',
            marginBottom: '0.5rem',
          }}
        >
          &copy; {new Date().getFullYear()} Netflix . All Rights Reserved.
        </Typography>
        <Box
          style={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          <Link
            href="https://www.facebook.com"
            style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              transition: 'color 0.3s ease',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </Link>
          <Link
            href="https://www.twitter.com"
            style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              transition: 'color 0.3s ease',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </Link>
          <Link
            href="https://www.instagram.com"
            style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              transition: 'color 0.3s ease',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </Link>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
