import { Button, Paper } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { createTheme } from '@mui/system';
import { useState } from 'react';
const MobileRideRecord = ({
	isRecording,
	handleRecording,
	isFormVisible,
	handleHideRecord,
}) => {
	return (
		<>
			{!isFormVisible && (
				<Paper>
					{!isRecording ? (
						<>
							<h2>Press record to begin your ride</h2>
							<Button
								style={{ color: 'red' }}
								onClick={() => {
									handleRecording();
								}}
							>
								<RadioButtonCheckedIcon />
							</Button>
						</>
					) : (
						<Button
							style={{ color: 'red' }}
							onClick={() => {
								handleRecording();
								handleHideRecord();
							}}
						>
							Stop
						</Button>
					)}
				</Paper>
			)}
		</>
	);
};

export default MobileRideRecord;
