import { FormControl, Input, InputLabel, Paper } from '@mui/material';
const MobileRideForm = () => {
	return (
		<>
			<FormControl>
				<InputLabel>Ride Title</InputLabel>
				<Input
					onChange={(e) => {
						console.log(e.target.value);
					}}
				/>
			</FormControl>
		</>
	);
};

export default MobileRideForm;
