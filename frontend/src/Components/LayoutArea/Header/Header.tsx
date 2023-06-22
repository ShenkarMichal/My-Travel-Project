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
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../4-Models/UserModel";
import RoleModel from "../../../4-Models/RoleModel";
import appConfig from "../../../2-Utils/Config";

interface HeaderProp {
    user: UserModel
}

function Header(prop: HeaderProp): JSX.Element {    

    const settings = [
        {head: 'Profile', link: "/auth/profile"},
        {head: 'My Travels', link: `/vacations/by-user/${prop.user?.userID}`},
        {head: 'Logout', link: "/auth/logout" }
    ];

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>){
        setAnchorElUser(event.currentTarget);
    };

    function handleCloseUserMenu() {

        setAnchorElUser(null);
    };

    let avatarImage = appConfig.getUserImageURL + prop.user?.userID
    if(!avatarImage) avatarImage = prop.user?.username.substring(0,1).toUpperCase()

    function getRandomColor():string {
        const red = Math.floor(Math.random()*256)
        const green = Math.floor(Math.random()*256)
        const blue = Math.floor(Math.random()*256)

        return `rgb(${red}, ${green}, ${blue})`
    }

    return (
        <div className="Header">
            <AppBar position="static" color="transparent" style={{boxShadow: "none"}}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters className="Toolbar">
                        {prop.user && <>
                            <NavLink to={"/vacations"}>
                                <Typography 
                                    variant="h6"
                                    noWrap
                                    sx={{
                                    fontSize: '1vw',
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'Oswald',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: "white",
                                    textDecoration: 'none',
                                    }}
                                >
                                    My Travel |
                                </Typography>
                            </NavLink> 
                            <span className="name">Helo {prop.user?.firstName} {prop.user?.lastName}</span>
                        </>}
                        {prop.user?.role === RoleModel.user &&
                            <Box sx={{ flexGrow: 0, position:"absolute", right: "20px"}}>
                                <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={avatarImage} sx={{bgcolor:getRandomColor()}}>{prop.user.username.substring(0,1).toUpperCase()}</Avatar>
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
                                        <MenuItem  onClick={handleCloseUserMenu} className="user-menu">
                                        {setting.head}
                                        </MenuItem>
                                    </NavLink>
                                ))}
                                </Menu>
                            </Box>
                        }
                        </Toolbar>
                    </Container>
                </AppBar>   
        </div>
    );
}

export default Header;



