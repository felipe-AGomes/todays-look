export type SelectedClothes = {
	id: number;
	category: Category;
};

export type Category =
'CALÇA'
| 'SHORTS/SAIA'
| 'BLUSA'
| 'CALÇADO'
| 'CAMISETA'
| 'FAVORITO'
| 'VESTIDO';

export type Body =
'body'
| 'legs'
| 'shoes'
| 'bodyLegs';

export type CategoriesData = {
	category: Category | 'TODOS';
	active: boolean;
};

export type ClotheDb = {
	id: string;
	category: Category;
	favorite: boolean;
	href: File;
	body: Body;
};

export type ClotheFe = {
	id: string;
	category: Category;
	favorite: boolean;
	href: string;
	body: Body;
};
