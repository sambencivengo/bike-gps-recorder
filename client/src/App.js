import './App.css';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Home from './components/Home';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';

function App() {
	const [token, setToken] = useState();
	const url = 'http://localhost:5000/user/portal/login';

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
	const loginPOST = async (url = '', data = {}) => {
		try {
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const user = await res.json();
			return user;
		} catch (error) {
			setLoginError(error);
			console.log(error);
		}
	};

	const handleLogin = async (username, password) => {
		const data = { userName: username, password: password };
		const user = await loginPOST(url, data);
		console.log();
		setToken(user.user.token);
	};

	if (!token) {
		console.log('token!');
		return (
			<div className="App" style={{ marginTop: '50px' }}>
				<Login logIn={handleLogin} />
			</div>
		);
	}
	return (
		<div className="App" style={{ marginTop: '50px' }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</ThemeProvider>

			{loginError && <h2>{loginError}</h2>}
		</div>
	);
}

export default App;
