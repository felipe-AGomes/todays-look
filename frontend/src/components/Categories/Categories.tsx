/* eslint-disable @typescript-eslint/object-curly-spacing */

import React from 'react';
import { type Clothe, type CategoriesData, type Message } from '../../types';
import SuspenseIcon from '../SuspenseIcon/SuspenseIcon';
import { heartEmpty, heartFill } from '../svg';

import './Categories.css';

type Props = {
	categories: CategoriesData;
	index: number;
	clothes: Clothe[];
	handleClickList: (index: number) => void;
	updateClothes: () => void;
	addClothe: (id: string) => void;
};

function Categories({
	categories,
	index,
	clothes,
	updateClothes,
	handleClickList,
	addClothe,
}: Props): JSX.Element {
	async function setFavorite(id: string): Promise<void> {
		const response = await fetch(`http://localhost:3333/clothes/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await response.json() as Message;
		if (data.error) {
			console.log(data.error);
			return;
		}

		updateClothes();
	}

	return (
		<li
			onClick={() => {
				handleClickList(index);
			}}
			className={`${categories.active ? 'active' : ''}`}>
			<h3>{categories.category}</h3>
			<div className='grid'>{
				clothes.map(clothe => (
					<div key={clothe.id} className='image'>
						<img src={clothe?.image} alt={clothe.category} onClick={() => {
							addClothe(clothe.id);
						}} />
						<SuspenseIcon
							clothe={clothe}
							icon={clothe.favorite ? heartFill : heartEmpty}
							handleClick={setFavorite}
						/>
					</div>
				))
			}
			</div>
		</li>
	);
}

export default Categories;
