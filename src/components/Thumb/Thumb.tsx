import './Thumb.css';
import React from 'react';

export default function Thumb({ title, author, abstract }) {
	return(
		<div className='Thumb'>
			<h2>{title}</h2>
			<p className='author'>by {author}</p>
			<img src={'https://picsum.photos/300/200/?x=' + title} alt='Thumbnail'/>
			<p className='abstract'>{abstract}</p>
		</div>
	);
}
