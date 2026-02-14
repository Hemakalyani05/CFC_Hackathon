
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { registerDonor, getDonors } from '../controllers/bloodController.js';

const router = express.Router();

router.route('/')
    .get(protect, getDonors);

router.route('/register')
    .post(protect, registerDonor);

export default router;
