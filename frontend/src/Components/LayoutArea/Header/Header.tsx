import "./Header.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import lottie from 'lottie-web';
import { defineElement } from "lord-icon-element";
import authService from "../../../5-Service/AuthService";


function Header(): JSX.Element {

    defineElement(lottie.loadAnimation)

    const pages = [
        {page: 'Contact Us', link:'/contact' },
        {page: 'About Us', link:'/about' },
    ];
    const settings = [
        {head: 'Profile', link: "/auth/profile"},
        {head: 'My Travels', link: "/auth/vacations"},
        {head: 'Logout', link: "/auth/login" }
    ];

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (head: string) => {
        if(head === "Logout"){
            authService.logout()
            alert("Goodbye, we look forward to seeing you again soon!!")
        }
        setAnchorElUser(null);
    };

    return (
        <div className="Header">
            <AppBar position="static" color="transparent" style={{boxShadow: "none"}}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                    <NavLink to={"/vacations"}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: "white",
                            textDecoration: 'none',
                            }}
                        >
                            My Travel
                        </Typography>
                    </NavLink>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <NavLink to={page.link} key={page.page}>
                                {page.page}
                        </NavLink>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                        </Tooltip>
                        <Menu
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
                            <NavLink to={setting.link} key={setting.head}>
                                <MenuItem  onClick={()=>handleCloseUserMenu(setting.head)}>
                                    <Typography className="user-menu" textAlign="center" >{setting.head}</Typography>
                                </MenuItem>
                            </NavLink>
                        ))}
                        </Menu>
                    </Box>
                    </Toolbar>
                </Container>
            </AppBar>            
        </div>
    );
}

export default Header;



