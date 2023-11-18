import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import {styled, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem, Stack, Box, Divider, Button} from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUi } from '../../context/ui';
import { useAuth}from '../../context/auth'



const drawerWidth = 240;
const URL = process.env.REACT_APP_API_URL;

const AppBar= styled(MuiAppBar)(({theme, open})=>({
    zIndex: theme.zIndex.drawer+1, 
    transition: theme.transitions.create('width'), 

    ...(open&&{
        width:`calc(100% - ${drawerWidth}px)`, 
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp, 
            duration: theme.transitions.leavingScreen        
        })
    })
}))

const Header = () => {
const navigate = useNavigate()
const {toggleMenu, sidebarOpen}  = useUi()
const {logout} = useAuth()
const {user} = useAuth()

 const [anchorEl, setAnchorEl] = useState(null)

  return (

    <AppBar open={sidebarOpen}>

        <Toolbar>
        {user?.username&&
        <IconButton color="inherit" size='large' edge="start" sx={{mr:2}}
         onClick={()=>toggleMenu()}
        >
            <MenuIcon/>
        </IconButton>
        }
        <Typography component="h1" variant='h6' noWrap sx={{flexGrow:1}} onClick={()=>navigate('/')}> Todo App</Typography>
        <Box sx={{cursor: 'pointer'}} onClick={(e)=> setAnchorEl(e.currentTarget)}> 
        {user?.username&&<Avatar src={`${URL}${user.image}`} alt={user?.username?.toUpperCase()}/>}        
        </Box>

        {user?.username&&<Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={()=>setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
            transformOrigin={{ vertical: 'top', horizontal: 'right'}}
        >
            <MenuItem>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Avatar src={`${URL}${user.image}`} alt={user?.username?.toUpperCase()} variant='square'/>
                <Stack direction="column" textAlign="center">
                    <Typography ml="50px" variant='h6' sx={{textTransform:'capitalize'}}> {user?.username}</Typography>
                    <Typography ml="50px" variant='subtitle2' sx={{textTransform:'capitalize', color:'gray'}}> 
                    {user?.role==='admin'?'Admin': 'User'}
                    </Typography>
                </Stack>
                </Stack>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={()=>navigate('/app/profile')}> 
                <PasswordIcon sx={{mr:2}}/>
                Change Password
             </MenuItem>
             <Divider/>
             <MenuItem onClick={()=>logout()}> 
                <LogoutIcon sx={{mr:2}}/>
                Logout
             </MenuItem>
        </Menu>}

        {!user?.username&&(
          <Stack spacing={2} direction='row'>
          <Button variant='contained' color='secondary' onClick={()=>navigate('/login')}>Login</Button>
          <Button variant='contained' color='warning' onClick={()=>navigate('/register')}>Signup</Button>
          </Stack>
          
        )}
        </Toolbar>
    </AppBar>
  )
}

export default Header