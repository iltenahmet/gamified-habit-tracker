import dbConnect from '../../lib/mongodb';
import Habit from '../../models/Habit';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		req.cookies = req.cookies || {};
		req.cookies.token = req.headers.authorization.split(' ')[1];

		const { JWT_SECRET } = process.env;
		const { habitId } = req.body;
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			const { id } = decoded;

			await dbConnect();
			const user = await User.findById(id);

			if (!user) {
				throw new Error('User not found');
			}

			const habit = await Habit.findById(habitId);

			if (!habit) {
				throw new Error('Habit not found');
			}

			if (habit.user.toString() !== id) {
				throw new Error('Unauthorized');
			}

			// Update habit streak, checked status, and updatedAt
			habit.streak += 1;
			habit.checked = true;
			habit.updatedAt = new Date();

			await habit.save();

			// Update user's xp based on streak
			user.xp += Math.min(habit.streak, 7);

			// Increment user level for each 20 xp
			if ((user.xp / 20) > user.level) {
				user.level++;
			}

			await user.save();

			res.status(200).json({ success: true });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
