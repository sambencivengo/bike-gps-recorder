import './App.css';
import React, { useEffect, useState } from 'react';
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
	const [currentUser, setCurrentUser] = useState(null);
	const [loginError, setLoginError] = useState(null);
	const loginPOST = async (url = '', data = {}) => {
		try {
			const res = await fetch(url, {
				method: 'POST',
				// headers: {
				// 	'Content-Type': 'application/json',
				// },
				body: JSON.stringify(data),
			});
			const user = await res.json();

			setCurrentUser(user);
		} catch (error) {
			setLoginError(error);
			console.log(error);
		}
	};

	useEffect(() => {
		if (currentUser) {
			setIsLoggedIn(true);
		}
	}, [currentUser]);
	console.log(isLoggedIn);
	const handleLogin = (username, password) => {
		const data = { userName: username, password: password };
		loginPOST(url, data);
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
