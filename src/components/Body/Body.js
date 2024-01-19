import './Body.css';
import Thumb from '../Thumb/Thumb.tsx';
import { useEffect, useState } from 'react';


const strTrim = (string, length) => {
	return string.length > length ? 
		string.substring(0, length - 3) + "..." : 
		string;
}

export default function Body({ searchInput }) {
	console.log('Rendering with', searchInput);
	const [news, setNews] = useState(null);
	const [loadErr, setLoadErr] = useState(null);

	useEffect(() => {
		let ignore = false;

		fetch(`http://192.168.1.7:8081/news${searchInput?.length > 0 ? '?match=' + searchInput : ''}`, {
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
	}, [searchInput]);

	return(
		<div className='Body'>
			{news || (loadErr ?? <p>Loading...</p>)}
		</div>
	);
}
