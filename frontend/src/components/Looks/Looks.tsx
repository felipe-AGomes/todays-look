import React, {useState} from 'react';
import {type CategoriesData, type Clothe} from '../../types';
import Categories from '../Categories/Categories';

import './Looks.css';

type Prop = {
	modal: 'active' | '';
	handleClickChange: (clothe: Clothe) => void;
};

function Looks({modal, handleClickChange}: Prop): JSX.Element {
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

	const [clothes, setClothes] = useState<Clothe[]>([
		{id: 1, category: 'CALÇA', body: 'legs', favorite: false, href: 'https://w7.pngwing.com/pngs/63/280/png-transparent-jeans-denim-slim-fit-pants-bell-bottoms-jeans-blue-fashion-boy.png'},
		{id: 2, category: 'CALÇA', body: 'legs', favorite: false, href: 'https://w7.pngwing.com/pngs/96/103/png-transparent-t-shirt-pants-clothing-pajamas-loose-pants-adidas-black-top.png'},
		{id: 3, category: 'SHORTS/SAIA', body: 'legs', favorite: false, href: 'https://w7.pngwing.com/pngs/300/400/png-transparent-jeans-denim-bermuda-shorts-jeans-active-shorts-para-shorts.png'},
		{id: 4, category: 'SHORTS/SAIA', body: 'legs', favorite: false, href: 'https://w7.pngwing.com/pngs/885/843/png-transparent-bermuda-shorts-button-pants-clothing-boardshorts-button-hybrid-color-trunks.png'},
		{id: 5, category: 'CAMISETA', body: 'body', favorite: false, href: 'https://w7.pngwing.com/pngs/29/367/png-transparent-white-crew-neck-t-shirt-t-shirt-leia-organa-hoodie-clothing-t-shirts-tshirt-white-bracelet.png'},
		{id: 6, category: 'CAMISETA', body: 'body', favorite: false, href: 'https://w7.pngwing.com/pngs/389/698/png-transparent-t-shirt-top-sleeve-clothing-black-t-shirt-white-crew-neck-t-shirt-tshirt-angle-white.png'},
		{id: 7, category: 'CALÇADO', body: 'shoes', favorite: false, href: 'https://w7.pngwing.com/pngs/1011/776/png-transparent-footwear-shoe-sneakers-sportswear-men-shoes-white-men-shoes-walking-shoe.png'},
		{id: 8, category: 'CALÇADO', body: 'shoes', favorite: false, href: 'https://w7.pngwing.com/pngs/484/755/png-transparent-sneakers-shoe-air-jordan-nike-footwear-jordan-white-orange-basketballschuh.png'},
		{id: 9, category: 'BLUSA', body: 'body', favorite: false, href: 'https://w7.pngwing.com/pngs/528/973/png-transparent-white-pullover-hoodie-illustration-mexico-hoodie-bluza-clothing-mercadolibre-hoodie-white-sweatshirt-sweater.png'},
		{id: 10, category: 'BLUSA', body: 'body', favorite: false, href: 'https://w7.pngwing.com/pngs/175/902/png-transparent-black-hoodie-black-sweater-hoodie.png'},
	]);

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
