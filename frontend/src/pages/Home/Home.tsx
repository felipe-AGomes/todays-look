import React, {useState} from 'react';
import {type Clothe} from '../../components/Categories/Categories';
import Looks, {type Category} from '../../components/Looks/Looks';
import ClothesSet from '../../components/ClothesSet/ClothesSet';
import './Home.css';

export type SelectedClothes = {
	id: number;
	category: Category;
};

function Home(): JSX.Element {
	const [selectedClothes, setSelectedClothes] = useState<Clothe[]>([]);

	function handleClickChange(clothe: Clothe): void {
		const newSelectedClothes: Clothe[] = [...selectedClothes, clothe];

		setSelectedClothes(newSelectedClothes);
	}

	function removeCloth(id: number) {
		const newSelectedClothes: Clothe[] = selectedClothes.filter(clothe => clothe.id !== id);
		setSelectedClothes(newSelectedClothes);
		console.log(newSelectedClothes);
	}

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
			<div className='looks-container'>
				<Looks handleClickChange={id => {
					handleClickChange(id);
				}}/>
				<ClothesSet removeCloth={(id: number) => {
					removeCloth(id);
				}} selectedClothes={selectedClothes}/>
			</div>
		</main>
	);
}

export default Home;
