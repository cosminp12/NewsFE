import './Navbar.css';


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

	return(
		<div className="Navbar">
			<h1>Trending | Sport | Tech | Finance </h1>
			<input
				type="search"
				placeholder="Search"
				onChange={onChangeCb}
			/>
		</div>
	);
}
