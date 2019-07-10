import { AGE_UP_ASYNC, AGE_DOWN_ASYNC, HIDE_USERS, FETCH_USERS } from './actions';

const initialState = {
	age: 20,
	users: ''
};

const reducer = (state = initialState, action) => {
	const newState = { ...state };

	switch (action.type) {
		case AGE_UP_ASYNC:
			newState.age += action.value;
			break;

		case AGE_DOWN_ASYNC:
			newState.age -= action.value;
			break;

		case FETCH_USERS:
			newState.users = [...action.users];
			break;

		case HIDE_USERS:
			newState.users = [];
			break;
	}
	return newState;
};

export default reducer;