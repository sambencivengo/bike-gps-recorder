import { Button, Paper } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { createTheme } from '@mui/system';
const MobileRideRecord = ({ isRecording, handleRecording }) => {
	return (
		<>
			<Paper>
				{!isRecording ? <h2>Press record to begin your ride</h2> : null}
				{!isRecording ? (
					<Button
						style={{ color: 'red' }}
						onClick={() => {
							handleRecording();
						}}
					>
						<RadioButtonCheckedIcon />
					</Button>
				) : (
					<Button
						style={{ color: 'red' }}
						onClick={() => {
							handleRecording();
						}}
					>
						Stop
					</Button>
				)}
			</Paper>
		</>
	);
};

export default MobileRideRecord;
