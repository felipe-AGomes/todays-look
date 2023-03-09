import React, {useState} from 'react';
import Categories, {type Clothe} from '../Categories/Categories';
import {modalClothes} from '../model/model';

import './Looks.css';

export type Category =
'CALÇAS'
| 'SHORTS'
| 'BLUSAS'
| 'CALÇADOS'
| 'CAMISETAS'
| 'FAVORITOS'
| 'OUTROS';

export type CategoriesData = {
	category: Category | 'TODOS';
	active: boolean;
};

type Prop = {
	handleClickChange: (clothe: Clothe) => void;
};

function Looks({handleClickChange}: Prop): JSX.Element {
	const [categories, setCategories] = useState<CategoriesData[]>([
		{category: 'TODOS', active: true},
		{category: 'CALÇAS', active: false},
		{category: 'SHORTS', active: false},
		{category: 'BLUSAS', active: false},
		{category: 'CALÇADOS', active: false},
		{category: 'CAMISETAS', active: false},
		{category: 'OUTROS', active: false},
		{category: 'FAVORITOS', active: false},
	]);

	const [clothes, setClothes] = useState<Clothe[]>(modalClothes);

	function selectCloth(id: number) {
		const clothe: Clothe[] = clothes.filter(clothe => clothe.id === id ? clothe : undefined);
		handleClickChange(clothe[0]);
	}

	function handleClickList(index: number): void {
		const newCategories = categories.map((category, i) => ({...category, active: i === index}));
		setCategories(newCategories);
	}

	function handleClickFavorite(id: number): void {
		const newClothes = clothes.map(clothe => {
			if (clothe.id === id) {
				return {...clothe, favorite: !clothe.favorite};
			}

			return {...clothe};
		});

		setClothes(newClothes);
	}

	return (
		<div className='list-container'>
			<ul className='list'>
				{categories.map((cat, index) =>
					<Categories
						key={cat.category}
						categories={cat}
						index={index}
						clothes={clothes.filter(clothe =>
							cat.category === 'TODOS'
								? true
								: cat.category === 'FAVORITOS'
									? clothe.favorite
									: clothe.category === cat.category,
						)}
						selectCloth={id => {
							selectCloth(id);
						}}
						handleClickList={() => {
							handleClickList(index);
						}}
						handleClickFavorite={(id: number) => {
							handleClickFavorite(id);
						}}
					/>,
				)}
			</ul>
		</div>
	);
}

export default Looks;
