
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {Box,Button,Tooltip,Avatar,MenuItem,Toolbar,Typography,Divider,ListItem,ListItemIcon,
  IconButton,List,ListItemText} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

import Menu from '@mui/icons-material/Menu';


import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ChildCareRounded } from '@mui/icons-material';
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { isAutheticated } from '../../helper';

const drawerWidth = 240;
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DistLayout=({children})=> {
 const navigate= useNavigate()
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(true);
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


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logOut=()=>{
    localStorage.removeItem('jwt')
    navigate('/')
  }

  return (
    <Box sx={{ display: 'flex'}}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" open={open} sx={{backgroundImage:
       "linear-gradient(to right, #fc00ff 0%, #00dbde  51%, #fc00ff  100%)"
         }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <Menu />
          </IconButton>
         
          <Typography variant="h6" sx={{flexGrow:1,color:"white"}} >
          <Link style={{color:"white"}} to="/">
            APKA DUKAN
            </Link>
          </Typography>
          
          <Typography variant="h6" sx={{marginRight:'5px'}}  >
          
          </Typography>
          <Button variant="contained"
          onClick={logOut}
          sx={{backgroundImage:"linear-gradient(to right, #56CCF2 0%, #2F80ED  51%, #56CCF2  100%)"}} >Logout</Button>
         
         
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{backgroundImage:
       "linear-gradient(to right, #fc00ff 0%, #00dbde  51%, #fc00ff  100%)"
         }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
         
         <NavLink to="/dist/AdminDashboard" 
         sx={{marginTop:'1px'}}
          className={(isActive) =>
            'nav-link dashnavlink' + (isActive.isActive ? ' bg-info dashnavlink1' : '')
          }>
            <ListItem button>
              <ListItemIcon>
                 <InboxIcon /> 
              </ListItemIcon>
              <ListItemText style={{textDecoration:"none"}} primary={" Service"} />
            </ListItem>
          </NavLink>
        
         
         
       
         
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
       {children}
      </Box>
    </Box>
  );
}
export default DistLayout