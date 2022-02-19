import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

const Signup = ({ signup, error }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	return (
		<>
			<h1>Signup Form</h1>

			<Box
				component="form"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
			>
				<Box>
					<TextField
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						label="Username"
					/>
					{error && <p>{error.username}</p>}
				</Box>
				<Box>
					<TextField
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						label="Email"
					/>
					{error && <p>{error.email}</p>}
				</Box>
				<Box>
					<TextField
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
						label="Password"
					/>
					{error && <p>{error.password}</p>}
				</Box>
				<Box>
					<Button
						onClick={() => {
							signup(username, email, password);
						}}
					>
						Log In
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default Signup;
