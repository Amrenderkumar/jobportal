import express from 'express';
import { login,register,updateProfile, logout} from '../controllors/user.controller.js'
import { AuthenticateToken } from '../middleware/isAuthenticated.js';
import { singleUploaded } from '../middleware/multer.js';

const router = express.Router();

router.post('/register', singleUploaded, register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/update/Profile', AuthenticateToken, singleUploaded, updateProfile);


export default router;