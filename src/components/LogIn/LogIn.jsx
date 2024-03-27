import './LogIn.css';
import { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';


export default function LogIn() {
	const [email, setEmail] = useState('a@a.a');
	const [password, setPassword] = useState('a');
	const signIn = useSignIn();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:8081/api/login', {
				method: 'POST',
				mode: 'cors',
				// headers: {
				// 	'Content-Type': 'application/json',
				// },
				body: JSON.stringify({ email, password })
			});
			const data = await response.json();

			if (response.ok) {
				const { token } = data;
				const parsedToken = jwtDecode(token);

				signIn({
					auth: {
						token: token,
						type: 'Bearer'
					},
					userState: {
						name: parsedToken?.userName,
						uid: parsedToken?.userId
					}
				})

				console.log('LogIn successful!');
				// navigate(-1);
				navigate('/profile');
			} else {
				alert('Error in the response: ' + data.error);
			}
		} catch (error) {
			alert('Error: ' + error);
		}
	};

	return (
		<div>
			<h1>Log in:</h1>

			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Sign In</button>
			</form>
		</div>
	);
}
