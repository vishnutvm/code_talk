import { React, useState } from 'react';
import VideoChatOutlinedIcon from '@mui/icons-material/VideoChatOutlined';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Menu,
  Close,
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setLogout, setMode } from '../../../redux/userState/index';
import FlexBetween from '../../../components/FlexBetween';

function Navbar() {
  const [isMobile, setIsmobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state);

  // console.log(user);
  const isNotMobileScreen = useMediaQuery('(min-width:1000px)');
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const { dark } = theme.palette.neutral;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const { alt } = theme.palette.background;

  // managing error
  const { username } = user.user;
  //  let username = "vishnu"

  // console.log(username);
  // console.log(user);
  return (
    <FlexBetween padding="1rem 2rem" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem,2.25rem)"
          color="primary"
          onClick={() => navigate('/home')}
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          CodeTalk
        </Typography>
        {isNotMobileScreen && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search profile ..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop */}

      {isNotMobileScreen ? (
        <FlexBetween gap="2rem">
          <VideoChatOutlinedIcon sx={{ fontSize: '25px' }} />
          <Message sx={{ fontSize: '25px' }} />
          <Notifications sx={{ fontSize: '25px' }} />
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontsize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontsize: '25px' }} />
            )}
          </IconButton>

          <FormControl variant="standard" value={username} />

          <Select
            value={username}
            sx={{
              backgroundColor: neutralLight,
              width: '150px',
              borderRadius: '0.25rem',
              p: '0.25rem 1rem',
              '& .MuiSvgIcon-root': {
                pr: '0.25rem',
                width: '3rem',
              },
              '& .MuiSelect-select:focus': {
                backgroundColor: neutralLight,
              },
            }}
            input={<InputBase />}
          >
            <MenuItem value={username}>
              <Typography>{username}</Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
          </Select>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsmobile(!isMobile)}>
          <Menu />
        </IconButton>
      )}
      {/* mobile view */}

      {!isNotMobileScreen && isMobile && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* close icon */}

          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsmobile(!isMobile)}>
              <Close />
            </IconButton>
          </Box>

          {/* menu items */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <VideoChatOutlinedIcon sx={{ fontSize: '25px' }} />
            <Message sx={{ fontSize: '25px' }} />
            <Notifications sx={{ fontSize: '25px' }} />
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontsize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontsize: '25px' }} />
              )}
            </IconButton>
            <FormControl variant="standard" value={username} />

            <Select
              value={username}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                borderRadius: '0.25rem',
                p: '0.25rem 1rem',
                '& .MuiSvgIcon-root': {
                  pr: '0.25rem',
                  width: '3rem',
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={username}>
                <Typography>{username}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}

export default Navbar;
