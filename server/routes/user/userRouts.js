/* eslint-disable import/extensions */
import express from 'express';

import {
  getUser,
  getUserFriends,
  addRemoveFriends,
  edituser,
  resetpass,
  login,
  register,
  verifyEmail,
  resentOTP,
  findUser,
} from '../../controllers/userControllers.js';

import { verifyToken } from '../../middleware/token.js';
import { upload } from '../../middleware/fileUpload.js';

const router = express.Router();
router.post('/login', login);
router.post('/register', register);
router.get('/:id', getUser);
// router.get('/getuser', getUser);
router.get('/:id/friends', getUserFriends);

router.patch('/:id/:friendId', addRemoveFriends);

router.post('/edituser/:id', verifyToken, upload.single('picture'), edituser);
router.post('/resetpass/:id', resetpass);
router.post('/verifyEmail', verifyEmail);
router.post('/resentOTP', resentOTP);
router.post('/getuser', findUser);

export default router;
