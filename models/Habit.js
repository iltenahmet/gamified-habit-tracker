import mongoose from 'mongoose';

// a habit player should follow
const HabitSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	title: {type: String, required: true},
	streak: {type: Number, required: true}, // this can be negative if the user keeps missing cheecking off the habit
	repeatTime: {type: String, required: true},
	checked: {type: Boolean, default: false, required: true}
},
{ timestamps: true }
);

export default mongoose.models.Habit || mongoose.model('Habit', HabitSchema);