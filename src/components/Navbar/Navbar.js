import './Navbar.css';
import { Link } from "react-router-dom";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


const debounce = (cb, time = 1000) => {
	return (...args) => {
		clearTimeout(debounce.timeout);

		debounce.timeout = setTimeout(() => {
			cb(...args);
		}, time);
	};
}

export default function Navbar({ onSearchChange }) {
	const debounceSearch = debounce(text => {onSearchChange(text);});

	const onChangeCb = (event) => {
		const searchInput = event.target.value;

		debounceSearch(searchInput);
	}

	const authUser = useAuthUser();		// ??? Why no aut refresh?


	return(
		<div className="Navbar">
			<h1><Link className='NavLink' to='/'>Trending</Link> | <Link className='NavLink' to='/sport'>Sport</Link> | <Link className='NavLink' to='/tech'>Tech</Link> | <Link className='NavLink' to='/finance'>Finance</Link> </h1>
			
			<div id="barAndUser">
				<input
					type="search"
					placeholder="Search"
					onChange={onChangeCb}
				/>

				{ authUser?.name ? <h3>{authUser.name}</h3> : null }

				<Link className='NavLink' to='/profile'>
					<FontAwesomeIcon icon={faUser}/><div/>
				</Link>
			</div>
		</div>
	);
}
