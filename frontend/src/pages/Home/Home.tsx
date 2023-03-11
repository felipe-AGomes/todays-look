import React, {useState} from 'react';
import Looks from '../../components/Looks/Looks';
import ClothesSet from '../../components/ClothesSet/ClothesSet';
import './Home.css';
import {type Clothe} from '../../types';
import AddCloth from '../../components/AddCloth/AddCloth';

type Modal = {
	addCloth: 'active' | '';
	looks: 'active' | '';
};

function Home(): JSX.Element {
	const [selectedClothes, setSelectedClothes] = useState<Clothe[]>([]);
	const [modal, setModal] = useState<Modal>({addCloth: '', looks: 'active'});

	function handleClickChange(clothe: Clothe): void {
		const filteredClothes = selectedClothes.filter(element => element.body === clothe.body ? element : undefined);
		if (!filteredClothes.length) {
			const newSelectedClothes: Clothe[] = [...selectedClothes, clothe];
			setSelectedClothes(newSelectedClothes);
		}
	}

	function removeCloth(id: number) {
		const newSelectedClothes: Clothe[] = selectedClothes.filter(clothe => clothe.id !== id);
		setSelectedClothes(newSelectedClothes);
	}

	function logOut() {
		console.log('Log Out');
	}

	function activeModal(n: 'addCloth' | 'cloth') {
		if (n === 'addCloth') {
			setModal({addCloth: 'active', looks: ''});
			return;
		}

		setModal({addCloth: '', looks: 'active'});
	}

	return (
		<main id='home'>
			<header>
				<nav>
					<ul>
						<li
							className={`${modal.addCloth}`}
							onClick={() => {
								activeModal('addCloth');
							}}>Adicionar roupa</li>
						<li
							className={`${modal.looks}`}
							onClick={() => {
								activeModal('cloth');
							}}>Roupas</li>
					</ul>
				</nav>
				<h1>TODAYS LOOK</h1>
				<button onClick={() => {
					logOut();
				}}>Sign out</button>
			</header>
			<div className='looks-container'>
				<AddCloth modal={modal.addCloth}/>
				<Looks modal={modal.looks} handleClickChange={id => {
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
