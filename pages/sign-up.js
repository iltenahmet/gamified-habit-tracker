import { useState } from 'react';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';

const SignUp = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const usernameAvailable = await checkUsernameAvailability(username);
			if (!usernameAvailable) {
				setMessage('Username is already taken. Please choose another one.');
				return;
			}

			const hashedPassword = await generatePasswordHash(password);
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					passwordHash: hashedPassword,
					level: 1,
					xp: 0,
					equipments: [],
					habits: [],
				}),
			});

			const data = await response.json();

			if (data.success) {
				setMessage('User registered successfully, redirecting to login!');
				await router.push('/login');
			} else {
				setMessage('An error occurred during registration.');
			}
		} catch (error) {
			setMessage('An error occurred during registration.');
		}
	};

	const goBack = () => {
		router.push('/');
	};

	return (
		<div className="flex flex-col items-center py-8 min-h-screen bg-gradient-to-br from-blue-200 to-purple-300">
			<div className="flex flex-col items-center py-8">
				<h1 className="text-2xl mb-4">Sign Up</h1>
				<form onSubmit={handleSubmit} className="w-full max-w-sm">
					<div className="mb-4">
						<label htmlFor="username" className="block text-sm mb-2">
						Username:
						</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className="border rounded w-full py-2 px-3 text-gray-700"
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block text-sm mb-2">
						Password:
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="border rounded w-full py-2 px-3 text-gray-700"
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
					>
					Sign Up
					</button>
				</form>
				{message && <p className="mt-4">{message}</p>}
				<button
					onClick={goBack}
					className="mt-4 text-blue-500 hover:text-blue-700"
				>
				Go Back
				</button>
			</div>
		</div>
	);
};

async function generatePasswordHash(password) {
	const saltRounds = 10;
	return await bcrypt.hash(password, saltRounds);
}

async function checkUsernameAvailability(username) {
	const response = await fetch(`/api/check-username?username=${encodeURIComponent(username)}`);
	const data = await response.json();
	return data.available;
}

export default SignUp;
