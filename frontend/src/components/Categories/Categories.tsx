import React from 'react';
import {type CategoriesData, type Category} from '../Looks/Looks';
import SuspenseIcon from '../SuspenseIcon/SuspenseIcon';
import {heartEmpty, heartFill} from '../svg';

import './Categories.css';

type Props = {
	categories: CategoriesData;
	index: number;
	clothes: Clothe[];
	handleClickList: (index: number) => void;
	handleClickFavorite: (id: number) => void;
	selectCloth: (id: number) => void;
};

export type Clothe = {
	id: number;
	category: Category;
	favorite: boolean;
	href: string;
};

function Categories({
	categories,
	index,
	clothes,
	handleClickFavorite,
	handleClickList,
	selectCloth,
}: Props) {
	return (
		<li onClick={() => {
			handleClickList(index);
		}}
		className={`${categories.active ? 'active' : ''}`}>
			<h3>{categories.category}</h3>
			<div className='grid'>{
				clothes.map(clothe => (
					<>
						<div
							key={clothe.id}
							className='image'
							onClick={() => {
								selectCloth(clothe.id);
							}}>
							<img src={clothe.href} alt={clothe.category} />
							<SuspenseIcon
								clothe={clothe}
								icon={clothe.favorite ? heartFill : heartEmpty}
								handleClick={id => {
									handleClickFavorite(id);
								}}
							/>
						</div>
					</>
				))
			}
			</div>
		</li>
	);
}

export default Categories;
