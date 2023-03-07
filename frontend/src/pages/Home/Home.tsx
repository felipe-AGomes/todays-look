import React from 'react';
import Looks from '../../components/Looks/Looks';
import './Home.css';

function Home() {
	function logOut() {
		console.log('Log Out');
	}

	return (
		<main>
			<header>
				<h2>LOOK</h2>
				<h1>TODAYS LOOK</h1>
				<button onClick={() => {
					logOut();
				}}>Sign out</button>
			</header>
			<Looks />
		</main>
	);
}

export default Home;
