import {useRouter} from 'next/router';
import jwt from 'jsonwebtoken';
import dbConnect from '../lib/mongodb';
import User from '../models/User';
import Habit from '../models/Habit';

const Main = ({token, username, xp, level, habits}) => {
	const router = useRouter();

	const handleLogout = () => {
		document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		router.push('/login');
	};

	const navigateToAddHabit = () => {
		router.push('/add-habit');
	};

	const deleteHabit = async (habitId) => {
		try {
			const response = await fetch('/api/delete-habit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify({habitId}),
			});

			if (response.ok) {
				window.location.reload();
			} else {
				const {error} = await response.json();
				alert(error);
				console.log(error);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getColorByStreak = (streak) => {
		if (streak > 3) {
			return '#48BB78'; // Green
		} else if (streak >= 0) {
			return '#FACC15'; // Yellow
		} else {
			return '#F56565'; // Red
		}
	};

	const checkOffHabit = async (habitId) => {
		try {
			const response = await fetch('/api/check-off-habit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify({habitId}),
			});

			if (response.ok) {
				window.location.reload();
			} else {
				const {error} = await response.json();
				alert(error);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const displayHabits = () => {
		return habits.map((habit) => (
			<div
				key={habit._id}
				className="p-4 m-2 text-white rounded w-full"
				style={{backgroundColor: getColorByStreak(habit.streak)}}
			>
				<h2>{habit.title}</h2>
				<p>Streak: {habit.streak}</p>
				<p>Repeat Time: {habit.repeatTime}</p>
				<p>Checked: {habit.checked ? 'Yes' : 'No'}</p>
				<button
					onClick={() => checkOffHabit(habit._id)}
					className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
				>
					Check Off
				</button>
				<button
					onClick={() => deleteHabit(habit._id)}
					className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 ml-2 rounded"
				>
					Delete
				</button>
			</div>
		));
	};

	return (
		<div className="flex flex-col items-center py-8 bg-gradient-to-br from-blue-200 to-purple-300 min-h-screen">
			<div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mb-8">
				<h1 className="text-4xl font-bold mb-4 text-gray-800">Gamified Habit Tracker</h1>
				<p className="text-gray-800">Username: {username}</p>
				<p>Xp: {xp}</p>
				<p>Level: {level}</p>
			</div>
			<div className="w-full max-w-md">{displayHabits()}</div>
			<div className="mt-4">
				<button
					onClick={navigateToAddHabit}
					className="mb-2 mr-5 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
				>
					Add Habit
				</button>
				<button
					onClick={handleLogout}
					className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
				>
					Log Out
				</button>
			</div>
		</div>
	);
};

export async function getServerSideProps(context) {
	const {req} = context;

	const getCookie = (name) => {
		const cookies = req.headers.cookie || '';
		const cookie = cookies.split(';').find((c) => c.trim().startsWith(`${name}=`));
		if (!cookie) {
			return '';
		}
		return cookie.split('=')[1];
	};

	const token = getCookie('token');
	const {JWT_SECRET} = process.env;

	if (!token) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		const {id} = decoded;

		await dbConnect();
		const user = await User.findById(id);

		if (!user) {
			throw new Error('User not found');
		}

		const habits = await Habit.find({user: id});

		return {
			props: {
				token,
				username: user.username,
				xp: user.xp,
				level: user.level,
				habits: JSON.parse(JSON.stringify(habits)),
			},
		};
	} catch (error) {
		console.error(error);
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
}

export default Main;



