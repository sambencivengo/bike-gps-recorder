import { Paper } from '@mui/material';

const RideCard = ({ ride, renderPolyLine }) => {
	return (
		<>
			<Paper
				onClick={() => {
					renderPolyLine(ride);
				}}
			>
				<h1>{ride.name}</h1>
			</Paper>
		</>
	);
};

export default RideCard;
