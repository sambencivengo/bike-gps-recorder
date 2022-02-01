import './App.css';
import React, { useEffect, useState } from 'react';
const url = 'http://localhost:5000/api/v1/rides';
function App() {
	const [rideData, setRideData] = useState(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		fetch(url)
			.then((r) => r.json())
			.then((data) => {
				setRideData(data);
				setLoaded(!loaded);
			});
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>Render bike data here:</h1>
				{loaded ? (
					rideData.rides.map((ride) => {
						console.log(ride.coordinates);
						return <h1 key={ride.id}>{ride.rideName}</h1>;
					})
				) : (
					<h1>Error, couldn't retrieve data</h1>
				)}
			</header>
		</div>
	);
}

export default App;
