import { takeLatest, put, delay, call, select, take, all, fork } from 'redux-saga/effects';
import {
	AGE_UP,
	AGE_DOWN,
	AGE_UP_ASYNC,
	AGE_DOWN_ASYNC,
	SHOW_USERS,
	FETCH_USERS,
	FETCH_USERS_FAILED
} from '../store/actions';

function* ageUpAsync() {
	yield delay(1000);
	yield put({ type: AGE_UP_ASYNC, value: 1 });
}

export function* watchAgeUp() {
	yield takeLatest(AGE_UP, ageUpAsync);
}

function* ageDownAsync() {
	yield delay(1000);
	yield put({ type: AGE_DOWN_ASYNC, value: 1 });
}

export function* watchAgeDown() {
	yield takeLatest(AGE_DOWN, ageDownAsync);
}

function* fetchUsers() {
	try {
		const res = yield call(fetch, 'https://jsonplaceholder.typicode.com/users');
		const users = yield call([res, res.json]);
		yield put({ type: FETCH_USERS, users });
	} 
	catch(error) {
		yield put({ type: FETCH_USERS_FAILED });
	}
}

export function* watchShowUsers() {
	yield takeLatest(SHOW_USERS, fetchUsers);
}

// Log all actions
export function* watchAndLog() {
	while(true) {
		const action = yield take('*')
		const state = yield select()

		console.log('action', action)
    console.log('state after', state)
	}
}

export function* rootSaga() {
	// ===== 1 option =====
	// yield all([
	// 	watchAgeUp(),
	// 	watchAgeDown(),
	// 	watchShowUsers(),
	// 	watchAndLog()
	// ])

	// ===== 2 option =====
	yield fork(watchAgeUp)
	yield fork(watchAgeDown)
	yield fork(watchShowUsers)
	yield fork(watchAndLog)
}