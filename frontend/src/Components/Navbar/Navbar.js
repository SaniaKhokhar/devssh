import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ai from "../../Assest/ai.png";
import userw from "../../Assest/userw.png"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'
// const pages = [
//   {
//     name: 'Home',
//     url: '/'
//   }

//   // {
//   //   "name": "Feedback",
//   //   "url": "/feedback"
//   // },

//   // {
//   //   "name": "About Us",
//   //   "url": "/aboutus"
//   // }

// ];
const pages = ['Home', 'Feedback', 'About Us']
const settings = ['Login'];
// const settings = ['Profile', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const auth = useAuth()

  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar 
      style={{backgroundColor: "#070F2B"}}
      position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Avatar
            alt="curio"
            src={ai}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CURIO
          </Typography>

          <Box
          
           sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              
            >
              {/* {pages.map((page) => (
                <MenuItem 
                  // style={{backgroundColor: "#070F2B", color: "white"}}
                  key={page.name}
                  component={Link}
                  to={`/${page.url}`}
                  onClick={handleCloseNavMenu}>
                  <Typography  textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))} */}

              <MenuItem
                  // style={{backgroundColor: "#070F2B", color: "white"}}
                  component={Link}
                  to={'/'}
                  onClick={handleCloseUserMenu}>
                  Home
              </MenuItem>
              <MenuItem
                  // style={{backgroundColor: "#070F2B", color: "white"}}
                  component={Link}
                  to={'/feedback'}
                  onClick={handleCloseUserMenu}>
                  Feedback
              </MenuItem>
              <MenuItem
                  // style={{backgroundColor: "#070F2B", color: "white"}}
                  component={Link}
                  to={'/aboutus' }
                  onClick={handleCloseUserMenu}>
                  About us
              </MenuItem>
              {auth?.isLoggedIn ? (<MenuItem
                  // style={{backgroundColor: "#070F2B", color: "white"}}
                  component={Link}
                  to={'/login' }
                  onClick={handleCloseUserMenu}>
                  Logout
              </MenuItem>) 
              : 
              (<MenuItem
                  // style={{backgroundColor: "#070F2B", color: "white"}}
                  component={Link}
                  to={'/login' }
                  onClick={handleCloseUserMenu}>
                  Login
              </MenuItem>)
              }
            </Menu>
          </Box>
          <Avatar
            alt="curio"
            src={ai}
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CURIO
          </Typography>
          <Box 
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}

            <Button
                onClick={() => navigate('/')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
            </Button>
            <Button
                onClick={() => navigate('/feedback')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Feedback
            </Button>

            <Button
                onClick={() => navigate('/aboutus')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About Us
            </Button>
            {auth?.isLoggedIn ? 
              (<Button
                onClick={() => navigate('/login')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Logout
            </Button>)
            :
            (<Button
                onClick={() => navigate('/login')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
            </Button> )   
            }          
          </Box>

          <Box 
          
          sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="profile" src={userw} />
              </IconButton>
            </Tooltip>
            {/* <Menu

              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              
            >
               {settings.map((setting) => (
                <MenuItem
                  style={{backgroundColor: "#070F2B", color: "white"}}
                  
                  key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} 

              <MenuItem
                  // style={{backgroundColor: "#070F2B", color: "white"}}
                  component={Link}
                  to={'/login'}
                  onClick={handleCloseUserMenu}>
                  Login
                </MenuItem>

            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

// import React from "react";
// import "./Navbar.css";
// import sun from "../../Assest/sun.png";
// import moon from "../../Assest/moon.png";
// import yolob from "../../Assest/yolob.png";
// import yolow from "../../Assest/yolow.png";
// import userb from "../../Assest/userb.png";
// import userw from "../../Assest/userw.png";
// import Login from "../Login/Login";
// import { Link, useNavigate } from "react-router-dom";
// import UserProfile from "../Login/UserProfile";

// const Navbar = ({ mode, setMode }) => {
//   // toggle finction --> link it with togglw icon
//   const toggle_mode = () => {
//     mode === "light" ? setMode("dark") : setMode("light");
//   };

//   const userId = UserProfile.getId();
//   const userName = UserProfile.getUsername();

//   const navigate = useNavigate();

//   const handleProfile = () => {
//     navigate(`/profile/${userId}`);
//   };

//   return (
//     <div className="navbar">
//       <img src={ yolow } alt="YOLO" className="logo" />

//       {/* <ul>
//         <li>Home</li>
//         <li>Feedback</li>

//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//       </ul> */}

//       <div className="username">
//         <p>Welcome {userName && <p>{userName}</p>}</p>
//       </div>

//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/feedback">Feedback</Link>
//         </li>
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//       </ul>

//       {/* for Dark and Light mode */}
      

//       {/* User logo */}
//       <img
        
//         src={ userw }
//         alt="User"
//         className="toggle"
//       />
//     </div>
//   );
// };

// export default Navbar;

// // onCanPlay = It is a HTML attribute which useful if you want to perform some action or provide feedback