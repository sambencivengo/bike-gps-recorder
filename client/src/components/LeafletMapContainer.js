import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const myIcon = L.Icon.Default;

const LeafletMapContainer = ({ ride }) => {
	function getPolyLineFromRide() {
		if (!ride) {
			return null;
		}
		const polyLine = ride.coordinates.map((loc) => [loc.lat, loc.lng]);
		const bounds = [
			ride.coordinates[0],
			ride.coordinates[ride.coordinates.length - 1],
		];
		return (
			<Polyline
				pathOptions={redOptions}
				positions={polyLine}
				noClip={true}
			/>
		);
	}

	const redOptions = { color: 'red' };

	return (
		<MapContainer
			// bounds={bounds ? bounds : null}
			style={{ height: '450px', width: '' }}
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
			{getPolyLineFromRide()}
		</MapContainer>
	);
};

export default LeafletMapContainer;
