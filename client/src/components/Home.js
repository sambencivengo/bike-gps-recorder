import { CircularProgress, Container, Grid, List, Stack } from '@mui/material';
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
			<Container maxWidth="md">
				<Stack>
					<Container>
						<LeafletMapContainer ride={selectedRide} />
					</Container>
					{error && <h1>Error, couldn't retrieve data</h1>}
					<Grid
						spacing={4}
						sx={{
							display: 'flex',
							justifyContent: 'space-evenly',
							float: 'left',

							maxHeight: '250px',
							overflowX: 'scroll',
						}}
					>
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
							<CircularProgress color="primary" />
						)}
					</Grid>
				</Stack>
			</Container>
		</>
	);
};

export default DesktopLayout;
