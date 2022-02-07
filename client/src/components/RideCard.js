import { Button, Card, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/system';

const RideCard = ({ ride, renderPolyLine }) => {
	const theme = useTheme();
	console.log(theme.palette.primary.main);
	return (
		<>
			<Paper>
				<Typography variant="h5">{ride.name}</Typography>
				<Button
					color="secondary"
					variant="contained"
					onClick={() => {
						renderPolyLine(ride);
					}}
				>
					View Route
				</Button>
			</Paper>
		</>
	);
};

export default RideCard;
