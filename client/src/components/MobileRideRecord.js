import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const MobileRideRecord = ({ isRecording, handleRecording }) => {
	return (
		<>
			{!isRecording ? (
				<Button
					onClick={() => {
						handleRecording();
					}}
				>
					Record
				</Button>
			) : (
				<Button
					onClick={() => {
						handleRecording();
					}}
				>
					Stop
				</Button>
			)}
		</>
	);
};

export default MobileRideRecord;
