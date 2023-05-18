import dbConnect from '../../lib/mongodb';
import Habit from '../../models/Habit';
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
			const habit = await Habit.findById(habitId);

			if (!habit) {
				throw new Error('Habit not found');
			}

			if (habit.user.toString() !== id) {
				throw new Error('Unauthorized');
			}

			await Habit.findByIdAndDelete(habitId);

			res.status(200).json({ success: true });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}

