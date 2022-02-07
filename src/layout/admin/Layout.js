
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {Box,Button,Tooltip,Avatar,MenuItem} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ChildCareRounded } from '@mui/icons-material';
import { NavLink, Link } from 'react-router-dom'

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

const Layout=({children})=> {
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
          APKA DUKAN@gmail.com
          </Typography>
          <Button variant="contained" sx={{backgroundImage:"linear-gradient(to right, #56CCF2 0%, #2F80ED  51%, #56CCF2  100%)"}} >Logout</Button>
         
         
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
         <NavLink sx={{marginTop:'1px'}}
         className={(isActive) =>
                    'nav-link dashnavlink' + (isActive.isActive ? ' bg-info dashnavlink1' : '')
                  } to="/dashboard">
            <ListItem
            to="/dashboard" button>
              <ListItemIcon>
                 <InboxIcon /> 
              </ListItemIcon>
              <ListItemText style={{textDecoration:"none"}} primary={"Dashboard"} />
            </ListItem>
          </NavLink>
         <NavLink to="/allService" 
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
         <NavLink to="/allcategory"
         sx={{marginTop:'1px'}}
          className={(isActive) =>
            'nav-link dashnavlink' + (isActive.isActive ? ' bg-info  dashnavlink1' : '')
          }>
            <ListItem button>
              <ListItemIcon>
                 <InboxIcon /> 
              </ListItemIcon>
              <ListItemText style={{textDecoration:"none"}} primary={" Category"} />
            </ListItem>
          </NavLink>
         <NavLink to="/allState"
          className={(isActive) =>
            'nav-link dashnavlink' + (isActive.isActive ? ' bg-info  dashnavlink1' : '')
          }>
            <ListItem button>
              <ListItemIcon>
                 <InboxIcon /> 
              </ListItemIcon>
              <ListItemText style={{textDecoration:"none"}} primary={" State"} />
            </ListItem>
          </NavLink>
         <NavLink to="/allDistrict"
          className={(isActive) =>
            'nav-link dashnavlink' +    (isActive.isActive ? ' bg-info dashnavlink1' : '')
          }>
            <ListItem button>
              <ListItemIcon>
                 <InboxIcon /> 
              </ListItemIcon>
              <ListItemText style={{textDecoration:"none"}} primary={" District"} />
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
export default Layout