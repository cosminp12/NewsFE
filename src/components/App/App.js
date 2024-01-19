import './App.css';

import Navbar from '../Navbar/Navbar';
import Body from '../Body/Body';

import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useState } from 'react';


function Layout() {
	return (
	  <div>
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/add">Home</Link>
				</li>
				<li>
					<Link to="/login">Home</Link>
				</li>
			</ul>
		</nav>
		<Outlet />
	  </div>
	);
}

export default function App() {
	const [search, setSearch] = useState('');

	return (
		<div className="App">
			<Navbar onSearchChange={text => { setSearch(text) }} />
			{/* <Routes>
					<Route path="/" element={<Body searchInput={search}/>}/>
					<Route path="/add" element={<h1>Add news</h1>}/>
					<Route path="/login" element={<h1>Login</h1>}/>
			</Routes> */}
		</div>
	);
}
