import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../navbar';
import UserWidget from '../widgets/UserWidget';
import CreatePost from '../widgets/CreatePost';
import PostsWidget from '../widgets/PostsWidget';
import FriendsListWidgest from '../widgets/FriendsListWidgest';

function HomePage() {
  const isNotMobileScreen = useMediaQuery('(min-width:1000px)');
  const { _id, picturePath } = useSelector((state) => state.user.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNotMobileScreen ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNotMobileScreen ? '26px' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        <Box
          flexBasis={isNotMobileScreen ? '42%' : undefined}
          mt={isNotMobileScreen ? undefined : '2rem'}
        >
          <CreatePost picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNotMobileScreen && (
          <Box flexBasis="26%">
            <FriendsListWidgest userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
