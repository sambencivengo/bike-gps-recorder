import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import LeafletMapContainer from './LeafletMapContainer';
import RideCard from './RideCard';

const DesktopLayout = () => {
	const url = '/api/v1/rides';

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
		<>
			<h1>Desktop Mode</h1>
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
		</>
	);
};

export default DesktopLayout;
