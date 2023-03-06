import React, {useEffect, useRef, useState} from 'react';
import {type CategoriesData, type Category} from '../Looks/Looks';
import {heartEmpty, heartFill} from '../svg';

import './Categories.css';

type Props = {
	categories: CategoriesData;
	index: number;
	handleClickList: (index: number) => void;
};

export type Clothes = {
	id: number;
	category: Category;
	favorite: boolean;
	href: string;
};

function Categories({categories, index, handleClickList}: Props) {
	const [clothes, setClothes] = useState<Clothes[]>([
		{id: 1, category: 'CALÇAS', favorite: true, href: 'https://w7.pngwing.com/pngs/63/280/png-transparent-jeans-denim-slim-fit-pants-bell-bottoms-jeans-blue-fashion-boy.png'},
		{id: 2, category: 'CALÇAS', favorite: false, href: 'https://w7.pngwing.com/pngs/96/103/png-transparent-t-shirt-pants-clothing-pajamas-loose-pants-adidas-black-top.png'},
		{id: 3, category: 'SHORTS', favorite: false, href: 'https://w7.pngwing.com/pngs/300/400/png-transparent-jeans-denim-bermuda-shorts-jeans-active-shorts-para-shorts.png'},
		{id: 4, category: 'SHORTS', favorite: false, href: 'https://w7.pngwing.com/pngs/885/843/png-transparent-bermuda-shorts-button-pants-clothing-boardshorts-button-hybrid-color-trunks.png'},
		{id: 5, category: 'CAMISETAS', favorite: false, href: 'https://w7.pngwing.com/pngs/29/367/png-transparent-white-crew-neck-t-shirt-t-shirt-leia-organa-hoodie-clothing-t-shirts-tshirt-white-bracelet.png'},
		{id: 6, category: 'CAMISETAS', favorite: false, href: 'https://w7.pngwing.com/pngs/389/698/png-transparent-t-shirt-top-sleeve-clothing-black-t-shirt-white-crew-neck-t-shirt-tshirt-angle-white.png'},
		{id: 7, category: 'CALÇADOS', favorite: false, href: 'https://w7.pngwing.com/pngs/1011/776/png-transparent-footwear-shoe-sneakers-sportswear-men-shoes-white-men-shoes-walking-shoe.png'},
		{id: 8, category: 'CALÇADOS', favorite: false, href: 'https://w7.pngwing.com/pngs/484/755/png-transparent-sneakers-shoe-air-jordan-nike-footwear-jordan-white-orange-basketballschuh.png'},
		{id: 9, category: 'BLUSAS', favorite: false, href: 'https://w7.pngwing.com/pngs/528/973/png-transparent-white-pullover-hoodie-illustration-mexico-hoodie-bluza-clothing-mercadolibre-hoodie-white-sweatshirt-sweater.png'},
		{id: 10, category: 'BLUSAS', favorite: false, href: 'https://w7.pngwing.com/pngs/175/902/png-transparent-black-hoodie-black-sweater-hoodie.png'},
	]);

	const filteredClothes = clothes.filter((element): Clothes | undefined => {
		if (categories.category === 'FAVORITOS' && element.favorite) {
			return element;
		}

		if (categories.category === 'TODOS') {
			return element;
		}

		if (element.category === categories.category) {
			return element;
		}

		return undefined;
	});

	function handleClickFavorite(id: number): void {
		const copyClothes: Clothes[] = clothes.map(element => {
			if (element.id === id && !element.favorite) {
				return {...element, favorite: true};
			}

			if (element.id === id && element.favorite) {
				return {...element, favorite: false};
			}

			return {...element};
		});

		setClothes(copyClothes);
	}

	console.log('renderizou');

	return (
		<li onClick={() => {
			handleClickList(index);
		}}
		className={`${categories.active ? 'active' : ''}`}>
			<h3>{categories.category}</h3>
			<div className='grid'>{
				filteredClothes.map(element => (
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
