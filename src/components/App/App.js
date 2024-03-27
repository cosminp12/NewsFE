import './App.css';

import Navbar 		from '../Navbar/Navbar';
import Body 		from '../Body/Body';
import UserProfile 	from '../UserProfile/UserProfile';
// import LogIn 		from '../LogIn/LogIn';

import { Routes, Route } from "react-router-dom";
// import RequireAuth from '@auth-kit/react-router/RequireAuth'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import React, { useState } from 'react';

const LogIn = React.lazy(() => import('../LogIn/LogIn'));


export default function App() {
	const [search, setSearch] = useState('');

	return (
		<div className="App">
			<Navbar onSearchChange={text => { setSearch(text) }} />
			<Routes>
				<Route path="/"        element={<Body searchInput={search} cathegory=''       />}/>
				<Route path="/sport"   element={<Body searchInput={search} cathegory='sport'  />}/>
				<Route path="/tech"    element={<Body searchInput={search} cathegory='tech'   />}/>
				<Route path="/finance" element={<Body searchInput={search} cathegory='finance'/>}/>

				{/* <Route path="/profile" element={
					<RequireAuth fallbackPath={'/login'}>
						<UserProfile/>
					</RequireAuth>
				}/> */}
				<Route element={<AuthOutlet fallbackPath='/login'/>}>
					<Route path='/profile' element={<UserProfile/>} />
				</Route>

				<Route path="/login"   element={<LogIn/>}/>
				<Route path="*"        element={<h1>Page not found!</h1>}/>
			</Routes>
		</div>
	);
}
