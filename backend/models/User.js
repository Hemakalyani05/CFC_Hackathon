import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'volunteer', 'admin'], default: 'user' },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    volunteerRole: {
        type: String,
        enum: ['general', 'first_aid', 'transport', 'night_safety'],
        default: 'general'
    },
    location: {
        type: { type: String, default: "Point" }, // For volunteers
        coordinates: { type: [Number], index: '2dsphere' }, // [longitude, latitude]
    },
    availability: { type: Boolean, default: true }, // For volunteers
    rating: { type: Number, default: 0 },
    isDonor: { type: Boolean, default: false },
    lastDonationDate: { type: Date },
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
