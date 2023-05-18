import dbConnect from '../../lib/mongodb';
import Habit from '../../models/Habit';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { JWT_SECRET } = process.env;
		const { title, repeatTime } = req.body;
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

			const habit = new Habit({
				user: user._id,
				title,
				color: 'yellow',
				streak: 0,
				repeatTime,
				checked: false,
			});

			await habit.save();
			res.status(200).json({ message: 'Habit created successfully' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while creating the habit' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
