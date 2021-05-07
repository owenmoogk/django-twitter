import React, { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'

export default function Tweetpage(props){
	
	const [data, setContent] = useState('')
	let { id } = useParams();

	function getTweet(tweetId) {
		fetch("/tweets/tweet/"+tweetId+"/")
			.then(res => res.json())
			.then(json => {
				console.log(json)
				setContent(json)
			});
	}

	useEffect(() => {
		getTweet(id)
	}, [])


	return(
		<div className='tweet'>
			<p><span className='username'>@{data.user}</span> • <span className='time'>{data.time}</span></p>
			<p id='tweetContent'>{data.content}</p>
		</div>
	)
}