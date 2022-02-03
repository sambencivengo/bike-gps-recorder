import './App.css';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Container, Grid } from '@mui/material';
import 'leaflet/dist/leaflet.css';

import RideCard from './components/RideCard';
import LeafletMapContainer from './components/LeafletMapContainer';

const url = 'http://localhost:5000/api/v1/rides';

function App() {
	function detectMob() {
		const toMatch = [
			/Android/i,
			/webOS/i,
			/iPhone/i,
			/iPad/i,
			/iPod/i,
			/BlackBerry/i,
			/Windows Phone/i,
		];

		return toMatch.some((toMatchItem) => {
			return navigator.userAgent.match(toMatchItem);
		});
	}
	console.log(detectMob());

	const [rideData, setRideData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchRideData() {
			try {
				const res = await fetch(url);
				const { rides } = await res.json();
				setRideData(rides);
			} catch (error) {
				setError(error);
			}
		}

		fetchRideData();
	}, []);
	const [selectedRide, setSelectedRide] = useState(null);

	const renderPolyLine = (ride = {}) => {
		setSelectedRide(ride);
	};

	return (
		<div className="App" style={{ marginTop: '50px' }}>
			<Container maxWidth="md">
				<Grid container spacing={2}>
					<Grid item xs={4}>
						{error && <h1>Error, couldn't retrieve data</h1>}

						{rideData ? (
							rideData.map((ride) => {
								return (
									<RideCard
										renderPolyLine={renderPolyLine}
										key={ride._id}
										ride={ride}
									/>
								);
							})
						) : (
							<p>Loading...</p>
						)}
					</Grid>
					<Grid item xs={8}>
						<LeafletMapContainer ride={selectedRide} />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default App;
