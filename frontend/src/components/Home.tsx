import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import TableData from './TableData';



export default function Home() {
  const navigate =  useNavigate();
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Article-App
          </Typography>
          <Button onClick={()=>navigate("/login")} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Box sx={{marginTop:3}}>
      <TableData/>
    </Box>
    
    </>
    
  );
}
