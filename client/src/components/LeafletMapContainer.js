import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Polyline,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

const myIcon = L.Icon.Default;

const LeafletMapContainer = ({ ride }) => {
	const [polyLine, setPolyLine] = useState([]);

	const redOptions = { color: 'red' };
	useEffect(() => {
		if (ride !== null) {
			let mainArr = [];
			ride.coordinates.forEach((loc) => {
				console.log(loc);
				let nestedArr = [];
				nestedArr.push(loc.lat);
				nestedArr.push(loc.lng);
				mainArr.push(nestedArr);
			});
			setPolyLine(mainArr);
		}
		console.log(polyLine);
	}, [ride]);

	// zoom the map to the polyline

	return (
		<MapContainer
			style={{ height: '450px', width: '100%' }}
			center={[40.661541, -73.969283]}
			zoom={14}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* <Marker position={[51.505, -0.09]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker> */}
			<Polyline pathOptions={redOptions} positions={polyLine} />
		</MapContainer>
	);
};

export default LeafletMapContainer;
