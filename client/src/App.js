import './App.css';
import React from 'react';
import 'leaflet/dist/leaflet.css';

import MobileLayout from './components/MobileLayout';
import DesktopLayout from './components/DesktopLayout';

function App() {
	function detectMobile() {
		const toMatch = [
			/Android/i,
			/webOS/i,
			/iPhone/i,
			/iPad/i,
			/iPod/i,
			/BlackBerry/i,
			/Windows Phone/i,
		];

		return toMatch.some((toMatchItem) => {
			return navigator.userAgent.match(toMatchItem);
		});
	}

	return (
		<div className="App" style={{ marginTop: '50px' }}>
			{detectMobile() ? <MobileLayout /> : <DesktopLayout />}
		</div>
	);
}

export default App;
