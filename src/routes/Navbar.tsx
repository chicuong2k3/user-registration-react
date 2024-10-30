import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <Button component={Link} to="/register" color="inherit">Sign up</Button>
          <Button component={Link} to="/login" color="inherit">Sign in</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
