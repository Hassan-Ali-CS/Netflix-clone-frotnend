import React from 'react';
import { Container, Box, Typography, Link } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Import external CSS file

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container className="footer-container">
        <Typography variant="body2" className="footer-text">
          &copy; {new Date().getFullYear()} Netflix . All Rights Reserved.
        </Typography>
        <Box className="social-icons">
          <Link href="https://www.facebook.com"  className="social-link">
            <FaFacebook />
          </Link>
          <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaTwitter />
          </Link>
          <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaInstagram />
          </Link>
        </Box>
      </Container>
    </footer>
  );
};



//Inline CSS
// const footerStyles: React.CSSProperties = {
//     backgroundColor: '#141414',
//     color: '#fff',
//     padding: '1rem 0',
//     textAlign: 'center',
// };

// const containerStyles: React.CSSProperties = {
//     maxWidth : '1200 px',
//     margin : '0 auto',
//     padding: '0 1rem',
// };

// const textStyles: React.CSSProperties = {
//     margin: 0,
//     fontSize: '0.9rem', 
// };

// const socialMediaStyles: React.CSSProperties = {
//     marginTop: '0.5rem',
// };

// const linkStyles: React.CSSProperties = {
//     color: '#fff',
//     margin: '0.5rem',
//     textDecoration: 'none',
//     fontSize: '0.9rem',
// };

export default Footer;