import './App.css';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Home from './components/Home';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './components/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';

function App() {
	const navigate = useNavigate();
	const loginURL = '/user/portal/login';
	const signupURL = '/user/portal/register';
	const [signupErrors, setSignupErrors] = useState(null);

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
	const loginPOST = async (url = '', payload = {}) => {
		console.log(payload);
		try {
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},

				body: JSON.stringify(payload),
			});
			const data = await res.json();
		} catch (error) {
			setLoginError(error);
			console.log(error);
		}
	};

	const signupPOST = async (url = '', payload = {}) => {
		try {
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},

				body: JSON.stringify(payload),
			});
			const data = await res.json();
			console.log(data);
			if (data.user) {
				navigate('/login');
			}
			if (data.errors) {
				setSignupErrors(data.errors);
			}
		} catch (error) {
			setLoginError(error);
			console.log(error);
		}
	};
	const handleSignup = async (username = '', email = '', password = '') => {
		const data = { username: username, email: email, password: password };
		const newUser = await signupPOST(signupURL, data);
	};
	const handleLogin = async (username, password) => {
		const data = { username: username, password: password };
		const user = await loginPOST(loginURL, data);
		console.log(user);
	};

	return (
		<div className="App" style={{ marginTop: '50px' }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/login"
						element={<Login logIn={handleLogin} />}
					/>
					<Route
						path="/register"
						element={
							<Signup
								error={signupErrors}
								signup={handleSignup}
							/>
						}
					/>
				</Routes>
			</ThemeProvider>

			{loginError && <h2>{loginError}</h2>}
		</div>
	);
}

export default App;
