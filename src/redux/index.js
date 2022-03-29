const INITIAL_STATE = {
	userName: 'Francisco',
	colors: [
		{
			name: 'steel',
			backgr: '#d3d3d3',
			color: '#c0c0c0',
		},
		{
			name: 'water',
			backgr: '#4169e1',
			color: '#7b68ee',
		},
		{
			name: 'bug',
			backgr: '#9acd32',
			color: '#6b8e23',
		},
		{
			name: 'dragon',
			backgr: '#7b68ee',
			color: '#6a5acd',
		},
		{
			name: 'electric',
			backgr: '#ffff00',
			color: '#ffd700',
		},
		{
			name: 'ghost',
			backgr: '#800080',
			color: '#4b0082',
		},
		{
			name: 'fire',
			backgr: '#dc143c',
			color: '#b22222',
		},
		{
			name: 'fairy',
			backgr: '#ff88ee',
			color: '#ffbbee',
		},
		{
			name: 'ice',
			backgr: '#7fffd4',
			color: '#afeeee',
		},
		{
			name: 'fighting',
			backgr: '#b22222',
			color: '#8b0000',
		},
		{
			name: 'normal',
			backgr: '#e6e6fa',
			color: '#dcdcdc',
		},
		{
			name: 'grass',
			backgr: '#00ff00',
			color: '#32cd32',
		},
		{
			name: 'psychic',
			backgr: '#ee82ee',
			color: '#dda0dd',
		},
		{
			name: 'rock',
			backgr: '#cd853f',
			color: '#d2691e',
		},
		{
			name: 'dark',
			backgr: '#708090',
			color: '#2f4f4f',
		},
		{
			name: 'ground',
			backgr: '#deb887',
			color: '#d2b48c',
		},
		{
			name: 'poison',
			backgr: '#9370db',
			color: '#8a2be2',
		},
	],
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SET_USER_NAME':
			return {
				...state,
				userName: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
