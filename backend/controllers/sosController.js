import SOSRequest from '../models/SOSRequest.js';

// @desc    Create a new SOS request
// @route   POST /api/sos
// @access  Private
const createSOS = async (req, res) => {
    const { emergencyType, latitude, longitude, description } = req.body;

    const sos = await SOSRequest.create({
        userId: req.user._id,
        emergencyType,
        latitude,
        longitude,
        description,
        status: 'pending',
    });

    if (sos) {
        // Notify nearby volunteers via socket.io
        const sosData = await sos.populate('userId', 'name phone bloodGroup');
        console.log(`Emitting sos-created event for SOS ID: ${sos._id}`);
        req.io.emit('sos-created', sosData);

        res.status(201).json(sos);
    } else {
        res.status(400).json({ message: 'Invalid SOS data' });
    }
};

// @desc    Get all nearby SOS requests
// @route   GET /api/sos/nearby
// @access  Private (Volunteers only ideally)
const getNearbySOS = async (req, res) => {
    const { latitude, longitude, radius, status } = req.query; // Radius in km

    const query = status ? { status } : { status: 'pending' };

    const sosRequests = await SOSRequest.find(query)
        .populate('userId', 'name phone bloodGroup')
        .sort({ createdAt: -1 });

    res.json(sosRequests);
};

// @desc    Accept an SOS request
// @route   PUT /api/sos/:id/accept
// @access  Private
const acceptSOS = async (req, res) => {
    const sos = await SOSRequest.findById(req.params.id);

    if (sos) {
        if (sos.status !== 'pending') {
            res.status(400).json({ message: 'Request already accepted or completed' });
            return;
        }

        sos.status = 'accepted';
        sos.acceptedBy = req.user._id;
        const updatedSOS = await sos.save();
        res.json(updatedSOS);
    } else {
        res.status(404).json({ message: 'SOS request not found' });
    }
};

// @route   GET /api/sos/accepted
// @access  Private (Volunteers)
const getAcceptedSOS = async (req, res) => {
    try {
        const acceptedRequests = await SOSRequest.find({
            acceptedBy: req.user._id,
            status: { $in: ['accepted', 'resolved'] }
        })
            .populate('userId', 'name phone bloodGroup')
            .sort({ updatedAt: -1 });

        res.json(acceptedRequests);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @route   GET /api/sos/my-requests
// @access  Private
const getMyRequests = async (req, res) => {
    try {
        const requests = await SOSRequest.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { createSOS, getNearbySOS, acceptSOS, getAcceptedSOS, getMyRequests };
