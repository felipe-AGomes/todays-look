export type SelectedClothes = {
	id: number;
	category: Category;
};

export type Category =
	| 'CALÇA'
	| 'SHORTS/SAIA'
	| 'BLUSA'
	| 'CALÇADO'
	| 'CAMISETA'
	| 'FAVORITO'
	| 'VESTIDO';

export type Body = 'body' | 'legs' | 'shoes' | 'bodyLegs';

export type CategoriesData = {
	category: Category | 'TODOS';
	active: boolean;
};

export type Clothe = {
	id: string;
	key: string;
	category: Category;
	favorite: boolean;
	image: string | undefined;
	body: Body;
};

export type BodyReq = {
	image: string | undefined;
	category: Category;
	body: Body;
};
