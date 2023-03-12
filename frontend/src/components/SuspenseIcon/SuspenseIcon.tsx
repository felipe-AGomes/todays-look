import React from 'react';
import {type ClotheFe} from '../../types';
import './SuspenseIcon.css';

type Prop = {
	clothe: {
		id: string;
	};
	icon: JSX.Element;
	handleClick: (id: string) => void;
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
