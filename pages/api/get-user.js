import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
	await dbConnect();

	if (req.method === 'POST') {
		const { username } = req.body;

		try {
			const user = await User.findOne({ username });

			if (user) {
				res.status(200).json({
					success: true,
					data: {
						username: user.username,
						level: user.level,
						xp: user.xp,
					},
				});
			} else {
				res.status(404).json({ success: false, message: 'User not found' });
			}
		} catch (error) {
			res.status(500).json({ success: false, message: 'Server error' });
		}
	} else {
		res.status(405).json({ success: false, message: 'Method not allowed' });
	}
}
