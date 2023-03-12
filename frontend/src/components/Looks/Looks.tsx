
import React, {useEffect, useState} from 'react';
import {type ClotheFe, type CategoriesData, type ClotheDb} from '../../types';
import Categories from '../Categories/Categories';

import './Looks.css';

type Prop = {
	modal: 'active' | '';
	clothes: ClotheFe[];
	handleClickChange: (clothe: ClotheFe) => void;
	setNewClothe: (clothe: ClotheDb[]) => void;
};

function Looks({modal, clothes, setNewClothe, handleClickChange}: Prop): JSX.Element {
	const [categories, setCategories] = useState<CategoriesData[]>([
		{category: 'TODOS', active: true},
		{category: 'CALÇA', active: false},
		{category: 'SHORTS/SAIA', active: false},
		{category: 'BLUSA', active: false},
		{category: 'CALÇADO', active: false},
		{category: 'CAMISETA', active: false},
		{category: 'VESTIDO', active: false},
		{category: 'FAVORITO', active: false},
	]);

	function selectCloth(id: string) {
		const clothe: ClotheFe[] = clothes.filter(clothe => clothe.id === id ? clothe : undefined);
		handleClickChange(clothe[0]);
	}

	function handleClickList(index: number): void {
		const newCategories = categories.map((category, i) => ({...category, active: i === index}));
		setCategories(newCategories);
	}

	return (
		<div className={`
			list-container
			${modal}
		`}>
			<ul className='list'>
				{categories.map((cat, index) =>
					<Categories
						key={cat.category}
						categories={cat}
						index={index}
						clothes={clothes.filter(clothe =>
							cat.category === 'TODOS'
								? cat
								: cat.category === 'FAVORITO'
									? clothe.favorite
									: clothe.category === cat.category,
						)}
						selectCloth={selectCloth}
						handleClickList={() => {
							handleClickList(index);
						}}
						setNewClothe={setNewClothe}
					/>,
				)}
			</ul>
		</div>
	);
}

export default Looks;
