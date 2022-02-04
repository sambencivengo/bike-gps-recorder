import { Container, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import MobileRideForm from './MobileRideForm';
import MobileRideRecord from './MobileRideRecord';

const MobileLayout = () => {
	const url = 'http://localhost:5000/api/v1/rides';

	const [isRideFinished, setIsRideFinished] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [isFormVisible, setIsFormVisible] = useState(false);

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	const [recordedRide, setRecordedRide] = useState([]);

	let activeRide = [];
	function success(pos) {
		var crd = pos.coords;
		activeRide.push({ lat: crd.latitude, lng: crd.longitude });
	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	function handleRecording() {
		setIsRecording(!isRecording);
	}
	function handleHideRecord() {
		setIsFormVisible(true);
	}

	useEffect(() => {
		if (!isRecording) {
			return;
		}

		function recordRide() {
			navigator.geolocation.getCurrentPosition(success, error, options);
		}

		const timer = setInterval(recordRide, 500);
		return () => {
			setRecordedRide(activeRide);
			setIsRideFinished(true);
			clearInterval(timer);
		};
	}, [isRecording]);

	async function postRide(url = '', data = {}) {
		console.log(data);
		try {
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			return res.json();
		} catch (error) {
			console.log(error);
		}
	}

	const [postedRide, setPostedRide] = useState(null);
	function handleRideSubmit(name) {
		console.log(name);
		console.log(recordedRide);
		const data = {
			name: name,
			userId: 1,
			coordinates: recordedRide,
		};
		postRide(url, data).then((ride) => {
			console.log(ride);
			setPostedRide(ride);
			setIsFormVisible(false);
		});
	}

	console.log(recordedRide);
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
						<Paper elevation={10}>
							{/* RIDE CONFIRMATION WILL GO HERE */}
							{/* {postedRide && confirmation()} */}
							{isRideFinished && (
								<MobileRideForm
									handleRideSubmit={handleRideSubmit}
									isFormVisible={isFormVisible}
								/>
							)}
						</Paper>
						<MobileRideRecord
							isFormVisible={isFormVisible}
							handleHideRecord={handleHideRecord}
							isRecording={isRecording}
							handleRecording={handleRecording}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default MobileLayout;
