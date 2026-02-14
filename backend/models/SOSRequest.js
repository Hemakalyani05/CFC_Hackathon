import mongoose from 'mongoose';

const sosSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    emergencyType: {
        type: String,
        enum: ['medical', 'fire', 'police', 'accident', 'safety', 'breakdown'],
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed'],
        default: 'pending',
    },
    acceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
});

const SOSRequest = mongoose.model('SOSRequest', sosSchema);

export default SOSRequest;
