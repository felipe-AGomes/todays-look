import React from 'react';
import {type Clothe} from '../../types';
import './SuspenseIcon.css';

type Prop = {
	clothe: Clothe;
	icon: JSX.Element;
	handleClick: (id: number) => void;
};

function SuspenseIcon({clothe, icon, handleClick}: Prop) {
	return (
		<div className='suspense-icon' onClick={handleClick ? () => {
			handleClick(clothe.id);
		} : undefined}>{icon}
		</div>
	);
}

export default SuspenseIcon;
