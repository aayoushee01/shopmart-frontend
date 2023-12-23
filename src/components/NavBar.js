import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box, useMediaQuery,IconButton, Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const NavBar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <AppBar
    position='sticky'
      style={{
        width: isMobile ? '100%' : '75vw',
        left: isMobile ? '0' : '12.5vw',
        right: isMobile ? '0' : '12.5vw',
        margin: '0 auto',
        top: '0',
        zIndex: '100',
        marginTop:'10px',
        borderRadius: '20px',
      }}
    >
      <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '20px',
      }}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Box>
          <IconButton component={Link} to="/cart">
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

        