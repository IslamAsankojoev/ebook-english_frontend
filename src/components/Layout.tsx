import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import useRole from '@/hooks/useRole';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

type IRoute = {
  title: string;
  href: string;
};
const pages: IRoute[] = [
  {
    title: 'Главная',
    href: '/',
  },
  {
    title: 'О нас',
    href: '/about',
  },
  {
    title: 'Контакты',
    href: '/contacts',
  },
  {
    title: 'Отзывы',
    href: '/review',
  },
  {
    title: 'Профиль',
    href: '/profile',
  },
  {
    title: 'Добавить вопрос для теста',
    href: '/create-question',
  },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Layout: FC<LayoutProps> = ({ children, title = 'Страница' }) => {
  const { isAuth, isTeacher } = useRole();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page: IRoute) => {
    router.push(page.href);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          boxShadow: 'none',
        }}
      >
        <Container fixed>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" width={100} />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                {pages.map((page: IRoute) => {
                  if (page.href === '/create-question' && !isTeacher) return null;
                  if (page.href === '/profile' && !isAuth) return null;

                  return (
                    <MenuItem key={page.href} onClick={() => handleCloseNavMenu(page)}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
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
              <Typography variant="h5"> {title}</Typography>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => {
                if (page.href === '/create-question' && !isTeacher) return null;
                if (page.href === '/profile' && !isAuth) return null;
                return (
                  <Button key={page.href} onClick={() => handleCloseNavMenu(page)}>
                    {page.title}
                  </Button>
                );
              })}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isAuth ? (
                <Button
                  onClick={() => {
                    signOut();
                  }}
                >
                  <Typography>Выйти</Typography>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    router.push('/login');
                  }}
                >
                  <Typography>Войти</Typography>
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container fixed>
        <Box
          sx={{
            my: 4,
            p: 4,
            minHeight: 'calc(80vh - 64px)',
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
