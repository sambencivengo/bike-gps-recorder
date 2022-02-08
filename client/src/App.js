import './App.css';
import React from 'react';
import 'leaflet/dist/leaflet.css';

import MobileLayout from './components/MobileLayout';
import DesktopLayout from './components/DesktopLayout';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

	const theme = createTheme({
		palette: {
			primary: {
				main: '#233D4D',
			},
			secondary: {
				main: '#F5CB5C',
			},
			background: {
				default: '#CFDBD5',
				paper: '#E8EDDF',
			},
			text: {
				primary: '#242423',
			},
		},
	});
	return (
		<div className="App" style={{ marginTop: '50px' }}>
			{detectMobile() ? (
				<MobileLayout />
			) : (
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Container>
						<DesktopLayout />
					</Container>
				</ThemeProvider>
			)}
		</div>
	);
}

export default App;
