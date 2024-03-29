module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['xo', 'prettier'],
	overrides: [
		{
			extends: ['xo-typescript'],
			files: ['*.ts', '*.tsx'],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		Project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	rules: {},
};
