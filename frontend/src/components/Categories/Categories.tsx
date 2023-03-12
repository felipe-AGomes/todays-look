/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import {type ClotheFe, type CategoriesData, type ClotheDb} from '../../types';
import SuspenseIcon from '../SuspenseIcon/SuspenseIcon';
import {heartEmpty, heartFill} from '../svg';

import './Categories.css';

type Props = {
	categories: CategoriesData;
	index: number;
	clothes: ClotheFe[];
	handleClickList: (index: number) => void;
	setNewClothe: (clothes: ClotheDb[]) => void;
	selectCloth: (id: string) => void;
};

function Categories({
	categories,
	index,
	clothes,
	setNewClothe,
	handleClickList,
	selectCloth,
}: Props) {
	function setFavorite(id: string) {
		fetch(`http://localhost:3333/clothes/${id}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
		})
			.then(async response => response.json())
			.then((data: ClotheDb[]) => {
				setNewClothe(data);
			});
	}

	return (
		<li onClick={() => {
			handleClickList(index);
		}}
		className={`${categories.active ? 'active' : ''}`}>
			<h3>{categories.category}</h3>
			<div className='grid'>{
				clothes.map(clothe => (
					<div key={clothe.id} className='image'>
						<img src={clothe.href} alt={clothe.category} onClick={() => {
							selectCloth(clothe.id);
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
