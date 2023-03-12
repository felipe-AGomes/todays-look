/* eslint-disable @typescript-eslint/no-floating-promises */
import React, {useEffect, useState} from 'react';
import Looks from '../../components/Looks/Looks';
import ClothesSet from '../../components/ClothesSet/ClothesSet';
import './Home.css';
import {type ClotheFe, type ClotheDb} from '../../types';
import AddCloth from '../../components/AddCloth/AddCloth';

type Modal = {
	addCloth: 'active' | '';
	looks: 'active' | '';
};

function Home(): JSX.Element {
	const [selectedClothes, setSelectedClothes] = useState<ClotheFe[]>([]);
	const [modal, setModal] = useState<Modal>({addCloth: '', looks: 'active'});
	const [clothes, setClothes] = useState<ClotheFe[]>([]);

	useEffect(() => {
		fetch('http://localhost:3333/clothes')
			.then(async response => response.json())
			.then((data: ClotheDb[]) => {
				const newData = data.map(clothe => ({...clothe, href: fileReader(clothe.href)}));
				return newData;
			})
			.then(setClothes);
	}, []);

	function convertCloths(clothes: ClotheDb[]) {
		const newClothes = clothes.map(clothe => ({...clothe, href: fileReader(clothe.href)}));
		setClothes(newClothes);
	}

	function fileReader(file: File): string {
		const reader = new FileReader();
		let result = '';
		reader.readAsDataURL(file);
		reader.addEventListener('load', e => {
			const targetReader = e.target;
			const check = targetReader?.result;
			if (check && typeof check === 'string') {
				result = check;
			}
		});
		return result;
	}

	function setNewClothe(clothes: ClotheDb[]): void {
		convertCloths(clothes);
	}

	function handleClickChange(clothe: ClotheFe): void {
		const filteredClothes = selectedClothes.filter(element => element.body === clothe.body ? element : undefined);
		if (!filteredClothes.length) {
			const newSelectedClothes: ClotheFe[] = [...selectedClothes, clothe];
			setSelectedClothes(newSelectedClothes);
		}
	}

	function removeCloth(id: string) {
		const newSelectedClothes: ClotheFe[] = selectedClothes.filter(clothe => clothe.id !== id);
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
				<AddCloth setNewClothe={setNewClothe} modal={modal.addCloth}/>
				<Looks
					clothes={clothes}
					modal={modal.looks}
					handleClickChange={handleClickChange}
					setNewClothe={setNewClothe}/>

				<ClothesSet removeCloth={removeCloth} selectedClothes={selectedClothes}/>
			</div>
		</main>
	);
}

export default Home;
