import mongoose from 'mongoose';

// users
const UserSchema = new mongoose.Schema({
	username: {type: String, required: true},
	passwordHash: {type: String, required: true},
	level: {type: Number, min: 0, required: true},
	xp: {type: Number, min: 0, required: true},
	habits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Habit'}]
});

export default mongoose.models.User || mongoose.model('User', UserSchema);