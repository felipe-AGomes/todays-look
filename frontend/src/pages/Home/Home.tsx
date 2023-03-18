/* eslint-disable @typescript-eslint/no-floating-promises */
import React, {useEffect, useState} from 'react';
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
	const [clothes, setClothes] = useState<Clothe[]>([]);

	useEffect(() => {
		getAllClothes();
	}, []);

	const getAllClothes = async () => {
		fetch('http://localhost:3333/clothes')
			.then(async response => response.json())
			.then(setClothes);
	};

	function handleClickChange(clothe: Clothe): void {
		const filteredClothes = selectedClothes.filter(element => element.body === clothe.body ? element : undefined);
		if (!filteredClothes.length) {
			const newSelectedClothes: Clothe[] = [...selectedClothes, clothe];
			setSelectedClothes(newSelectedClothes);
		}
	}

	function removeCloth(id: string): void {
		const newSelectedClothes: Clothe[] = selectedClothes.filter(clothe => clothe.id !== id);
		setSelectedClothes(newSelectedClothes);
	}

	function addClothe(id: string): void {
		const selectedClothe: Clothe = clothes.filter(clothe => clothe.id === id)[0];
		const newSelectedClothes = selectedClothes.filter(clothe => clothe.body !== selectedClothe.body);
		if (selectedClothes.length === 0) {
			setSelectedClothes([selectedClothe]);
			return;
		}

		if (newSelectedClothes.length > 0) {
			setSelectedClothes([...selectedClothes, selectedClothe]);
		}
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
				<AddCloth updateClothes={getAllClothes} modal={modal.addCloth}/>
				<Looks
					clothes={clothes}
					modal={modal.looks}
					addClothe={addClothe}
					updateClothes={getAllClothes}/>

				<ClothesSet
					removeCloth={removeCloth}
					selectedClothes={selectedClothes}/>
			</div>
		</main>
	);
}

export default Home;
