import express from 'express';
import { createSOS, getNearbySOS, acceptSOS, getAcceptedSOS, getMyRequests } from '../controllers/sosController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createSOS)
    .get(protect, getNearbySOS);

router.route('/accepted').get(protect, getAcceptedSOS);
router.route('/my-requests').get(protect, getMyRequests);
router.route('/:id/accept').put(protect, acceptSOS);

export default router;
