import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function UserProfile() {
	const authUser = useAuthUser();
	const authHeader = useAuthHeader();
	const signOut = useSignOut();
	const navigate = useNavigate();
	const [info, setInfo] = useState(' - ');

	useEffect(() => {
		fetch('http://localhost:8081/api/user-info', {
			headers: {
				Authorization: authHeader,
			}
		}).then(response => {
			if(!response.ok) {
				throw new Error('Failed to fetch user data');
			}
			return response.json();
		}).then(response => {
			setInfo(response.info);
		}).catch(error => {
			console.error(error);
		});
	}, [authHeader]);	// ??? Why have dependency? How to avoid it?

	const buttonCb = () => {
		signOut();
		navigate('/');
	}

	return(
		<div>
			<h2>Hello {authUser?.name}!</h2>
			<p>About: {info}</p>
			<button onClick={buttonCb}>LogOut</button>
		</div>
	);
}
