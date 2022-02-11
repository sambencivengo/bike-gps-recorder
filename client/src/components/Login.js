import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

const Login = ({ logIn }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	console.log({ username }, { password });

	return (
		<>
			<h1>Login Form</h1>

			<Box
				component="form"
				sx={{
					justifyContent: 'center',
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
			>
				<TextField
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					label="Username"
				/>{' '}
				<TextField
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					type="password"
					label="Password"
				/>
			</Box>
			<Button
				onClick={() => {
					logIn(username, password);
				}}
			>
				Log In
			</Button>
		</>
	);
};

export default Login;
