import React, { useState } from "react"
import {useParams} from 'react-router-dom'

export default function Tweetpage(props){
	
	const [content, setContent] = useState('')
	let { id } = useParams();

	function getTweet(tweetId) {
		fetch("/tweets/tweet/"+tweetId+"/")
			.then(res => res.json())
			.then(json => {
				setContent(json.content)
			});
	}

	getTweet(id)


	return(
		<div>
			<h1>{content}</h1>
		</div>
	)
}