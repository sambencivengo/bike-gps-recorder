import { Button, Card, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/system';

const RideCard = ({ ride, renderPolyLine }) => {
	const theme = useTheme();
	console.log(theme.palette.primary.main);
	return (
		<>
			<Paper
				variant="outlined"
				elevation={30}
				square
				sx={{
					height: '200px',
					minWidth: '200px',
					marginLeft: '10px',
					marginRight: '10px',
				}}
			>
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
