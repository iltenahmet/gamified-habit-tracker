import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
	await dbConnect();

	if (req.method === 'POST') {
		const { username, password } = req.body;

		try {
			const user = await User.findOne({ username });

			if (!user) {
				res.status(401).json({ success: false, message: 'Invalid username or password.' });
				return;
			}

			const passwordMatch = await bcrypt.compare(password, user.passwordHash);

			if (!passwordMatch) {
				res.status(401).json({ success: false, message: 'Invalid username or password.' });
				return;
			}

			const token = jwt.sign(
				{ id: user._id, username: user.username },
				process.env.JWT_SECRET,
				{ expiresIn: '1d' }
			);

			res.setHeader('Set-Cookie', `token=${token}; HttpOnly; SameSite=Strict; Path=/`);
			res.status(200).json({ success: true, message: 'Login successful!' });
		} catch (error) {
			console.error('Error occurred during login:', error);
			res.status(500).json({ success: false, message: 'An error occurred during login.' });
		}
	} else {
		res.status(405).json({ success: false, message: 'Method not allowed.' });
	}
}
