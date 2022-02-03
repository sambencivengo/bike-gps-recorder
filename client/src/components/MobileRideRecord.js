import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const MobileRideRecord = () => {
	const [isRecording, setIsRecording] = useState(false);

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	let activeRide = [];
	function success(pos) {
		console.log(activeRide);
		var crd = pos.coords;
		activeRide.push([crd.latitude, crd.longitude]);

		// console.log('Your current position is:');
		console.log(`Latitude : ${crd.latitude}, Longitude: ${crd.longitude}`);
	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	useEffect(() => {
		if (!isRecording) {
			return;
		}

		function recordRide() {
			console.log('recording');
			navigator.geolocation.getCurrentPosition(success, error, options);
		}

		const timer = setInterval(recordRide, 500);
		return () => {
			clearInterval(timer);
		};
	}, [isRecording]);
	return (
		<>
			{!isRecording ? (
				<Button
					onClick={() => {
						setIsRecording(true);
					}}
				>
					Record
				</Button>
			) : (
				<Button
					onClick={() => {
						setIsRecording(false);
					}}
				>
					Stop
				</Button>
			)}
		</>
	);
};

export default MobileRideRecord;
