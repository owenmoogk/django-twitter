import React, { useState } from "react"

export default function Tweet(props){
	
	const [content, setContent] = useState('')

	function getTweet(tweetId) {
		fetch("/tweets/tweet/"+tweetId+"/")
			.then((response) => response.json())
			.then((data) => console.log(data))
	}

	getTweet(props.tweetId)


	return(
		<div>
			<h1>boioio</h1>
		</div>
	)
}