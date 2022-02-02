import './App.css';
import React, { useEffect, useState } from 'react';
const url = 'http://localhost:5000/api/v1/rides';

function App() {
	const [rideData, setRideData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchRideData() {
			try {
				const res = await fetch(url);
				const data = await res.json();
				setRideData(data);
			} catch (e) {
				setError(e);
			}
		}

		fetchRideData();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>Render bike data here:</h1>

				{error && <h1>Error, couldn't retrieve data</h1>}

				{rideData ? (
					rideData.rides.map((ride) => {
						return <h1 key={ride.id}>{ride.rideName}</h1>;
					})
				) : (
					<p>Loading...</p>
				)}
			</header>
		</div>
	);
}

export default App;
