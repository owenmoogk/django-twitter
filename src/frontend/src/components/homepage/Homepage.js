import React, { useEffect, useState } from "react"
import Tweet from './Tweet'

export default function Homepage(props){

	const [tweets, setTweets] = useState([])
	var returnData = []

	function getTweets() {

		fetch("/tweets/tweets/")
			.then(res => res.json())
			.then(json => {
				// https://flaviocopes.com/react-how-to-loop/
				for (const [index, value] of json.entries()){
					console.log(index, value)
					returnData.push(<Tweet key={index} data={value} />)
				}
				setTweets(returnData)
			});
	}

	useEffect(() =>{
		getTweets()
	}, [])


	return(
		<div>
			{tweets}
		</div>
	)
}