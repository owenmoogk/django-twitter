import React, { useEffect, useState } from "react"
import Tweet from './Tweet'
import './homepage.css'

export default function Homepage(props){

	const [tweets, setTweets] = useState([])
	var returnData = []

	function getTweets() {

		fetch("/tweets/tweets/")
			.then(res => res.json())
			.then(json => {
				// https://flaviocopes.com/react-how-to-loop/
				for (const [index, value] of json.entries()){
					returnData.push(<Tweet key={index} data={value} />)
				}
				setTweets(returnData)
			});
	}

	useEffect(() =>{
		getTweets()
	}, [])


	return(
		<div id="homeTweets">
			{tweets}
		</div>
	)
}