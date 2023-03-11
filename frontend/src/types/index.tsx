export type SelectedClothes = {
	id: number;
	category: Category;
};

export type Category =
'CALÇAS'
| 'SHORTS'
| 'BLUSAS'
| 'CALÇADOS'
| 'CAMISETAS'
| 'FAVORITOS'
| 'OUTROS';

export type Body =
'body'
| 'legs'
| 'shoes'
| 'bodyLegs';

export type CategoriesData = {
	category: Category | 'TODOS';
	active: boolean;
};

export type Clothe = {
	id: number;
	category: Category;
	favorite: boolean;
	href: string;
	body: Body;
};
