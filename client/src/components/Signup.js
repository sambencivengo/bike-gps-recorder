import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

const Signup = ({ signup }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	return (
		<>
			<h1>Signup Form</h1>

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
						setEmail(e.target.value);
					}}
					label="Email"
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
					console.log(username, email, password);
					signup(username, email, password);
				}}
			>
				Log In
			</Button>
		</>
	);
};

export default Signup;
