import express from 'express';
import { RegisterUser, loginUser } from '../controllers/userController';
import { upload } from "../library/helpers/uploadImage";

const router = express.Router();

/* GET users listing. */
router.post('/register_user', upload.single("profile_picture"), RegisterUser);
router.post('/login', loginUser );

export default router;
