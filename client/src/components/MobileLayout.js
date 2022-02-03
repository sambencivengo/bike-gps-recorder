import { Button } from '@mui/material';
import { useState } from 'react';

const MobileLayout = () => {
	const [record, setRecord] = useState(false);

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	const [ride, setRide] = useState([]);

	let activeRide = [];

	function success(pos) {
		var crd = pos.coords;
		activeRide.push([crd.latitude, crd.longitude]);

		// console.log('Your current position is:');
		console.log(`Latitude : ${crd.latitude}, Longitude: ${crd.longitude}`);
	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	// navigator.geolocation.getCurrentPosition(success, error, options);

	let recordInterval;
	function startTimer() {
		if (!recordInterval) {
			recordInterval = setInterval(recordRide, 500);
		}
	}
	function recordRide() {
		console.log('recording');
		navigator.geolocation.getCurrentPosition(success, error, options);
	}
	const stopRecording = () => {
		clearInterval(recordInterval);
		recordInterval = null;
		setRecord(false);
	};

	return (
		<>
			<h1>Mobile Mode</h1>
			{!record ? (
				<Button
					onClick={() => {
						setRecord(true);
						startTimer();
					}}
				>
					Record
				</Button>
			) : (
				<Button onClick={stopRecording}>Stop</Button>
			)}
		</>
	);
};

export default MobileLayout;
