import { Container, Grid, Paper } from '@mui/material';
import MobileRideForm from './MobileRideForm';
import MobileRideRecord from './MobileRideRecord';

const MobileLayout = () => {
	return (
		<>
			<Container>
				<Grid
					container
					alignItems="center"
					justifyContent="center"
					spacing={12}
				>
					<Grid item xs={8}>
						<Paper>
							<MobileRideForm />
						</Paper>
						<MobileRideRecord />
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default MobileLayout;
