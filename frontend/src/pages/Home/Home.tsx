import React from 'react';
import Looks from '../../components/Looks/Looks';
import './Home.css';

function Home() {
	return (
		<main>
			<header>
				<h2>LOOK</h2>
				<h1>TODAYS LOOK</h1>
			</header>
			<Looks />
		</main>
	);
}

export default Home;
