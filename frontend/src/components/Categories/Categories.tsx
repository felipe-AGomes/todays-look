import React, {useEffect, useRef, useState} from 'react';
import {type CategoriesData, type Category} from '../Looks/Looks';
import {heartEmpty, heartFill} from '../svg';

import './Categories.css';

type Props = {
	categories: CategoriesData;
	index: number;
	clothes: Clothes[];
	handleClickList: (index: number) => void;
	handleClickFavorite: (id: number) => void;
};

export type Clothes = {
	id: number;
	category: Category;
	favorite: boolean;
	href: string;
};

function Categories({categories, index, clothes, handleClickFavorite, handleClickList}: Props) {
	return (
		<li onClick={() => {
			handleClickList(index);
		}}
		className={`${categories.active ? 'active' : ''}`}>
			<h3>{categories.category}</h3>
			<div className='grid'>{
				clothes.map(element => (
					<>
						<div className='image' key={element.id}>
							<img src={element.href} alt={element.category} />
							<div className='favorite' onClick={() => {
								handleClickFavorite(element.id);
							}}>{element.favorite ? heartFill : heartEmpty}</div>
						</div>
					</>
				))
			}
			</div>
		</li>
	);
}

export default Categories;
