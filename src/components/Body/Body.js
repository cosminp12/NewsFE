import './Body.css';
import Thumb from '../Thumb/Thumb.tsx';
import { useEffect, useState } from 'react';


const strTrim = (string, length) => {
	return string.length > length ? 
		string.substring(0, length - 3) + "..." : 
		string;
}

export default function Body({ searchInput, cathegory }) {
	console.log('Rendering with', searchInput);
	const [news, setNews] = useState(null);
	const [loadErr, setLoadErr] = useState(null);

	useEffect(() => {
		let ignore = false;

		fetch('http://localhost:8081/api/news?' + new URLSearchParams({
			match: searchInput,
			cathegory: cathegory
		}).toString(), {
			mode: 'cors'
		}).then(response => response.json())
		.then((response) => {
			if(!ignore) {
				setNews(response.map(item => {
					return <Thumb 
						key={item.id} 
						title={item.headline} 
						author={item.author} 
						abstract={strTrim(item.abstract, 174)}
					/>
				}));
			}
		}).catch((reason) => {
			if(!ignore) {
				setLoadErr(String(reason));
			}
		});

		return () => {
			ignore = true;
		};
	}, [searchInput, cathegory]);

	return(
		<div className='Body'>
			{news || (loadErr ?? <p>Loading...</p>)}
		</div>
	);
}
