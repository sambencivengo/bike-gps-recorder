import './App.css';
import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';

import MobileLayout from './components/MobileLayout';
import DesktopLayout from './components/DesktopLayout';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './components/Login';

function App() {
	const url = 'http://localhost:5000/user/portal/login';
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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

	const [loginError, setLoginError] = useState(null);
	const loginPOST = (url = '', data = {}) => {
		try {
			fetch(url, {
				method: "POST", 
				
			})
		} catch (error) {
			setLoginError(error);
			console.log(error);
		}
	};

	const handleLogin = (username, password) => {
		const data = { username, password };
	};
	return (
		<div className="App" style={{ marginTop: '50px' }}>
			{isLoggedIn ? (
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Container>
						<DesktopLayout />
					</Container>
				</ThemeProvider>
			) : (
				<Login logIn={handleLogin} />
			)}
			{loginError && <h2>{loginError}</h2>}
		</div>
	);
}

export default App;
