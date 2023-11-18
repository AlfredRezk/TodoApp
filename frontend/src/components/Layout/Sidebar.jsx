import DashboardIcon from '@mui/icons-material/Dashboard';
import StarsIcon from '@mui/icons-material/Stars';
import CategoryIcon from '@mui/icons-material/Category';
import MuiDrawer from '@mui/material/Drawer'
import {styled, Toolbar, ListItemButton, List, ListItemIcon, ListItemText, Link} from '@mui/material'
import { NavLink } from 'react-router-dom';
import { useUi } from '../../context/ui';
import { useAuth } from '../../context/auth';
const drawerWidth = 240;

const menu = [
  {title:'Todos', icon: <DashboardIcon/>, path:'/app/dashboard'},

]

const adminMenu=[
  {title:'Categories', icon: <CategoryIcon/>, path:'/app/categories'},
  {title:'Users', icon: <StarsIcon/>, path:'/app/users'},
]


const Drawer = styled(MuiDrawer)(({theme, open})=>({

"& .MuiDrawer-paper":{
  position:'relative', 
  whiteSpace: 'nowrap', 
  width:drawerWidth, 
  backgroundColor: '#1976D2', 
  boxSizing:'border-box',
  transition: theme.transitions.create('width'), 
  ...(!open&&{
    width: theme.spacing(7), 
    overflowX: 'hidden', 
    transition: theme.transitions.create('width'), 
  })
}
}))

const Sidebar = () => {

  const {sidebarOpen} = useUi()
  const {user} = useAuth();
  return (
  <Drawer open={sidebarOpen}  variant='permanent' sx={{m:-1}}>
    <Toolbar/>

    <List sx={{color:'white'}} component="nav">

 

      {menu.map((item, index)=>(
        <ListItemButton key={index} title={item.title} component={NavLink} to={item.path}>
            <ListItemIcon sx={{color:'white'}}> {item.icon}</ListItemIcon>
            <ListItemText primary={item.title}/>
        </ListItemButton>
      ))}
          {/* Admin ListItem */}
          {user?.role=='admin'&&(
        <>
            {adminMenu.map((item, index)=>(
        <ListItemButton key={index} title={item.title} component={NavLink} to={item.path}>
            <ListItemIcon sx={{color:'white'}}> {item.icon}</ListItemIcon>
            <ListItemText primary={item.title}/>
        </ListItemButton>
      ))}
        </>

      )}
  

    </List>
  </Drawer>
  )
}

export default Sidebar