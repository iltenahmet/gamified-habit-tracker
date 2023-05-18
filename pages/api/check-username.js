import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
	await dbConnect();

	if (req.method === 'GET') {
		const { username } = req.query;

		const user = await User.findOne({ username });

		if (user) {
			res.status(200).json({ available: false });
		} else {
			res.status(200).json({ available: true });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}