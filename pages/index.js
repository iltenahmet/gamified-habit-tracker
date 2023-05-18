import Head from 'next/head';
import Link from 'next/link';

const Index = () => (
	<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300">
		<Head>
			<title>Gamified Habit Tracker</title>
		</Head>

		<main className="flex flex-col items-center py-8">
			<h1 className="text-2xl mb-4">Gamified Habit Tracker</h1>
			<div className="buttons">
				<Link href="/sign-up">
					<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-4">
						Sign Up
					</button>
				</Link>
				<Link href="/login">
					<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
						Login
					</button>
				</Link>
			</div>
		</main>
	</div>
);

export default Index;
