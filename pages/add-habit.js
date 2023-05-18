import { useRouter } from 'next/router';
import { useState } from 'react';

const AddHabit = () => {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [repeatTime, setRepeatTime] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('/api/habits', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, repeatTime }),
		});

		if (response.ok) {
			router.push('/main');
		} else {
			alert('Error creating habit');
		}
	};

	return (
		<div className="flex flex-col items-center py-8 min-h-screen bg-gradient-to-br from-blue-200 to-purple-300">
			<div className="flex flex-col items-center py-8 ">
				<h1 className="text-2xl mb-4">Add a New Habit</h1>
				<form onSubmit={handleSubmit} className="w-full max-w-sm">
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
						Habit Title
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Title"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
						Repeat Time
						</label>
						<select
							value={repeatTime}
							onChange={(e) => setRepeatTime(e.target.value)}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							<option value="">Select Repeat Time</option>
							<option value="daily">Daily</option>
							<option value="every 2 days">Every 2 Days</option>
							<option value="every 3 days">Every 3 Days</option>
							<option value="every 4 days">Every 4 Days</option>
							<option value="every 5 days">Every 5 Days</option>
							<option value="every 6 days">Every 6 Days</option>
							<option value="weekly">Weekly</option>
							<option value="monthly">Monthly</option>
						</select>
					</div>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
					Add Habit
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddHabit;
