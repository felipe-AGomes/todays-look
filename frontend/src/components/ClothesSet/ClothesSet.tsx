import React, {useEffect} from 'react';
import {type Clothe} from '../Categories/Categories';
import SuspenseIcon from '../SuspenseIcon/SuspenseIcon';
import {trash} from '../svg';
import './ClothesSet.css';

type Prop = {
	selectedClothes: Clothe[];
	removeCloth: (id: number) => void;
};

function ClothesSet({selectedClothes, removeCloth}: Prop) {
	const body = selectedClothes.filter(clothe => clothe.category === 'BLUSAS' || clothe.category === 'CAMISETAS' ? clothe : undefined)[0];
	const legs = selectedClothes.filter(clothe => clothe.category === 'CALÇAS' || clothe.category === 'SHORTS' ? clothe : undefined)[0];
	const shoes = selectedClothes.filter(clothe => clothe.category === 'CALÇADOS' ? clothe : undefined)[0];
	console.log(body);

	return (
		<div id='clothesSet'>
			<div className='image body'>
				<img src={body?.href} alt={body?.category} />
				{body ? <SuspenseIcon
					clothe={body}
					icon={trash}
					handleClick={(id: number) => {
						removeCloth(id);
					}}
				/> : undefined}
			</div>
			<div className='image legs'>
				<img src={legs?.href} alt={legs?.category} />
				{legs ? <SuspenseIcon
					clothe={legs}
					icon={trash}
					handleClick={(id: number) => {
						removeCloth(id);
					}}
				/> : undefined}
			</div>
			<div className='image shoes'>
				{shoes ? <SuspenseIcon
					clothe={shoes}
					icon={trash}
					handleClick={(id: number) => {
						removeCloth(id);
					}}
				/> : undefined}
				<img src={shoes?.href} alt={shoes?.category} />
			</div>
		</div>
	);
}

export default ClothesSet;
