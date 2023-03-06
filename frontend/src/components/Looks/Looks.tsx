import React, {useState} from 'react';
import Categories from '../Categories/Categories';

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

function Looks() {
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

	function handleClickList(index: number) {
		const copyCategories = categories.map(element => ({...element, active: false}));
		copyCategories[index].active = true;
		setCategories(copyCategories);
	}

	return (
		<div className='list-container'>
			<ul className='list'>{
				categories.map((cat, index) => <Categories
					handleClickList={(index: number) => {
						handleClickList(index);
					}}
					categories={cat}
					key={cat.category}
					index={index} />)
			}</ul>
		</div>
	);
}

export default Looks;
