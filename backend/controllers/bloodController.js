
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Register as a donor
// @route   POST /api/blood/register
// @access  Private
const registerDonor = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error('User not found in request (Auth middleware failed)');
    }

    const { _id } = req.user;

    const user = await User.findById(_id);

    if (user) {
        user.isDonor = true;
        user.lastDonationDate = req.body.lastDonationDate || null;

        // If blood group wasn't set during signup, update it now
        if (req.body.bloodGroup) {
            user.bloodGroup = req.body.bloodGroup;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isDonor: updatedUser.isDonor,
            bloodGroup: updatedUser.bloodGroup,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get all donors
// @route   GET /api/blood
// @access  Private
const getDonors = asyncHandler(async (req, res) => {
    const { bloodGroup } = req.query;

    if (!req.user) {
        res.status(401);
        throw new Error('User not authorized');
    }

    let query = { isDonor: true };

    if (bloodGroup) {
        query.bloodGroup = bloodGroup;
    }

    // Get current user to exclude from results
    const currentUserId = req.user._id;
    query._id = { $ne: currentUserId };

    const donors = await User.find(query)
        .select('name bloodGroup location phone isDonor lastDonationDate')
        .lean();

    // Calculate distance if current user has location
    // This is a simple implementation. For production, use geospatial queries.
    // For now, we'll return the donors and let frontend handle basic filtering or just show them

    res.json(donors);
});

export { registerDonor, getDonors };
