import { Button, FormControl, Input, InputLabel, Paper } from '@mui/material';
import { useState } from 'react';
const MobileRideForm = ({ handleRideSubmit, isFormVisible }) => {
	const [formData, setFormData] = useState('');
	console.log(formData);
	return (
		<>
			{isFormVisible && (
				<FormControl>
					<InputLabel>Ride Title</InputLabel>
					<Input
						onChange={(e) => {
							setFormData(e.target.value);
						}}
					/>
					<Button
						onClick={() => {
							handleRideSubmit(formData);
						}}
					>
						Submit
					</Button>
				</FormControl>
			)}
		</>
	);
};

export default MobileRideForm;
