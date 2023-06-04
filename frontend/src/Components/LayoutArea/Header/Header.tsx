import "./Header.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import authService from "../../../5-Service/AuthService";
import UserModel from "../../../4-Models/UserModel";

interface HeaderProp {
    user: UserModel
}

function Header(prop: HeaderProp): JSX.Element {    

    const pages = [
        {page: 'Contact Us', link:'/contact' },
        {page: 'About Us', link:'/about' },
    ];

    const settings = [
        {head: 'Profile', link: "/auth/profile"},
        {head: 'My Travels', link: "/auth/vacations"},
        {head: 'Logout', link: "/auth/login" }
    ];

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>){
        setAnchorElUser(event.currentTarget);
    };

    function handleCloseUserMenu(head: string) {
        if(head === "Logout"){
            authService.logout()
            alert("Goodbye, we look forward to seeing you again soon!!")
        }
        setAnchorElUser(null);
    };

    return (
        <div className="Header">
            {prop.user &&
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
                                fontFamily: 'Oswald',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
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
                                    <MenuItem  onClick={()=>handleCloseUserMenu(setting.head)} className="user-menu">
                                       {setting.head}
                                    </MenuItem>
                                </NavLink>
                            ))}
                            </Menu>
                        </Box>
                        </Toolbar>
                    </Container>
                </AppBar>   
            }         
        </div>
    );
}

export default Header;



