import React from 'react';
import {type Clothe} from '../Categories/Categories';
import './SuspenseIcon.css';

type Prop = {
	clothe: Clothe;
	icon: JSX.Element;
	handleClick: (id: number) => void;
};

function SuspenseIcon({clothe, icon, handleClick}: Prop) {
	return (
		<div className='favorite' onClick={handleClick ? () => {
			handleClick(clothe.id);
		} : undefined}>{icon}
		</div>
	);
}

export default SuspenseIcon;
