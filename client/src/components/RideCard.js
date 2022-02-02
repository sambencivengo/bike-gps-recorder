import { Paper } from '@mui/material';

const RideCard = ({ ride, renderPolyLine }) => {
	return (
		<>
			<Paper
				onClick={() => {
					renderPolyLine(ride);
				}}
			>
				<h2>{ride.name}</h2>
			</Paper>
		</>
	);
};

export default RideCard;
