import './App.css';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Container, Grid } from '@mui/material';
import 'leaflet/dist/leaflet.css';

import RideCard from './components/RideCard';
import LeafletMapContainer from './components/LeafletMapContainer';

const url = 'http://localhost:5000/api/v1/rides';

function App() {
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
	const [renderedRide, setRenderedRide] = useState(null);

	const renderPolyLine = (ride = {}) => {
		setRenderedRide(ride);
	};

	return (
		<div className="App">
			<Container maxWidth="lg">
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
						<LeafletMapContainer ride={renderedRide} />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default App;
