/* eslint-disable react/jsx-props-no-spreading */
import {
  EditOutlined,
  DeleteOutlined,
  VideocamOutlined,
  ImageOutlined,
  CloseOutlined,
} from '@mui/icons-material';

import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';

// drop down

import Dropzone from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import UserImage from '../../../components/UserProfilePicture';
import FlexBetween from '../../../components/FlexBetween';
import WidgetWrapper from '../../../components/WindgetWrapper';
import { setPosts } from '../../../redux/userState';

// eslint-disable-next-line react/prop-types
function CreatePost({ postImgPath, postId = null }) {
  console.log(postId);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(postId);
  const [close, setclose] = useState(null);

  // image state

  const [image, setImage] = useState(null);

  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  // const isNotMobileScreen = useMediaQuery('(min-width:1000px)');
  const { mediumMain } = palette.neutral;
  const { medium } = palette.neutral;

  // getting the post for edit
  const editingPost = useSelector((state) =>
    state.posts.find((pos) => pos._id === postId)
  );

  const [post, setPost] = useState(editingPost ? editingPost.discription : '');
  const [isImage, setIsImage] = useState(
    !!(editingPost && editingPost.picturePath)
  );
  const [editPrev, setEditprev] = useState(
    editingPost && editingPost.picturePath
      ? `http://localhost:3001/assets/${editingPost.picturePath}`
      : ''
  );
  // handle post edit
  const handleEditPost = () => {
    console.log(editingPost);
    setEditing(null);
    setclose(true);
  };

  // handle create post
  const handlePost = async () => {
    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('discription', post);
    if (image) {
      console.log(image);
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }
    console.log(formData, '');

    // eslint-disable-next-line no-unused-vars
    const res = fetch('http://localhost:3001/createPost', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(formData, 'formdata');
        const posts = data;
        dispatch(setPosts({ posts }));
        // reset the state
        setImage(null);
        setPost('');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  // editing post

  if (editing) {
    return (
      <WidgetWrapper
        m="2rem 2rem"
        sx={{ padding: '0.5rem 0.5rem 0.75rem 1.5rem' }}
      >
        <Tooltip title="cancel" arrow placement="right">
          <IconButton
            sx={{ display: 'block', marginLeft: 'auto', marginRight: '0' }}
            onClick={handleEditPost}
          >
            <CloseOutlined />
          </IconButton>
        </Tooltip>

        <FlexBetween gap="1.5rem">
          <UserImage image={postImgPath} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: '100%',
              backgroundColor: palette.neutral.light,
              borderRadius: '2rem',
              padding: '1rem 2rem',
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add New Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image && image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {isImage && (
                    <IconButton
                      onClick={() => {
                        setImage(null);
                        setEditprev('');
                        setIsImage(false);
                      }}
                      sx={{ width: '15%' }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
            <Box>
              {/* need to change after edit success */}

              {image ? (
                <img
                  width="100%"
                  height="auto"
                  alt="post"
                  style={{
                    borderRadius: '0.75rem',
                    marginTop: '0.75rem',
                  }}
                  src={URL.createObjectURL(image)}
                />
              ) : (
                editPrev && (
                  <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{
                      borderRadius: '0.75rem',
                      marginTop: '0.75rem',
                    }}
                    src={editPrev && editPrev}
                  />
                )
              )}
            </Box>
          </Box>
        )}

        <Divider sx={{ margin: '1.25rem 0' }} />

        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem">
            <VideocamOutlined sx={{ color: mediumMain }} />
            <Typography color={mediumMain}>Video</Typography>
          </FlexBetween>

          <Button
            // if there is not post value desable the button
            disabled={!post}
            onClick={handleEditPost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: '3rem',
            }}
          >
            UPDATE
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  }
  if (!close) {
    return (
      <WidgetWrapper mb="1.2rem">
        <FlexBetween gap="1.5rem">
          <UserImage image={postImgPath} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: '100%',
              backgroundColor: palette.neutral.light,
              borderRadius: '2rem',
              padding: '1rem 2rem',
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>
                          {image ? image.name : editingPost}
                        </Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: '15%' }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}

        <Divider sx={{ margin: '1.25rem 0' }} />

        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem">
            <VideocamOutlined sx={{ color: mediumMain }} />
            <Typography color={mediumMain}>Video</Typography>
          </FlexBetween>

          <Button
            // if there is not post value desable the button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: '3rem',
            }}
          >
            POST
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  }

  if (close) {
    return null;
  }

  // normal post
}

export default CreatePost;
