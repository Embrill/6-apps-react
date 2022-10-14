import { useState } from 'react';
import './index.scss';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/counterSlice';

function App() {
	// Redux
	const count = useSelector((state) => state.counter.values);
	const dispatch = useDispatch();

	return (
		<div className="App">
			<div>
				<h2>Счетчик:</h2>
				<h1>{count}</h1>
				<button className="minus" onClick={() => dispatch(decrement())}>
					- Минус
				</button>
				<button className="plus" onClick={() => dispatch(increment())}>
					Плюс +
				</button>
			</div>
		</div>
	);
}

export default App;
