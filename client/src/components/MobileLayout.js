import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const MobileLayout = () => {
	const [isRecording, setIsRecording] = useState(false);

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

	// let recordInterval;
	// function startTimer() {
	// 	if (!recordInterval) {
	// 		recordInterval = setInterval(recordRide, 500);
	// 	}
	// }
	// function recordRide() {
	// 	console.log('recording');
	// 	navigator.geolocation.getCurrentPosition(success, error, options);
	// }
	// const stopRecording = () => {
	// 	clearInterval(recordInterval);
	// 	recordInterval = null;
	// };
	useEffect(() => {
		if (!isRecording) {
			return;
		}

		function recordRide() {
			console.log('recording');
			navigator.geolocation.getCurrentPosition(success, error, options);
		}

		const timer = setInterval(recordRide, 500);
		return () => clearInterval(timer);
	}, [isRecording]);

	return (
		<>
			<h1>Mobile Mode</h1>
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

export default MobileLayout;
