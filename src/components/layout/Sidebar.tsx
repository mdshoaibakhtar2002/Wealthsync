import { useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Stack } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import OpacityRoundedIcon from '@mui/icons-material/OpacityRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const drawerWidth = 220;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar() {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const context = useContext(AppContext);
  if (!context) {
      throw new Error('AppContext must be used within an AppProvider');
  }
  const { open, setOpen} = context;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', marginBottom:'1rem'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ background: '#4231b7'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Wealthsync
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            height: '100%',
            display: 'flex !important',
            justifyContent: 'space-between !important',
            alignContent: 'space-between',

            background: '#ececec'

          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Stack>
          <DrawerHeader >
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <KeyboardDoubleArrowLeftRoundedIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { text: 'Dashboard', icon: <ViewQuiltRoundedIcon />, path: '/' },
              { text: 'Planner', icon: <AssessmentRoundedIcon />, path: '/planner' },
              { text: 'Configuration', icon: <OpacityRoundedIcon />, path: '/configuration' },
              { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/settings' },
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <IconButton onClick={handleDrawerClose} sx={{ width: '6rem', borderRadius: '5px' }}>
            <LogoutRoundedIcon />
            <Typography>Log out</Typography>
          </IconButton>
        </Stack>
      </Drawer>
    </Box>
  );
}
