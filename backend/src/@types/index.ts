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
	key: string;
	category: Category;
	image: string | undefined;
	body: Body;
	userId: number;
};

export type BodyReq = {
	image: string | undefined;
	category: Category;
	body: Body;
};

export type UserData = {
	name: string;
	email: string;
	password: string;
};

export type Register = {
	password: string;
	name: string;
	email: string;
};

export type Login = {
	password: string;
	email: string;
};
