import React, { useEffect, useState } from "react"
import Tweet from '../tweet/Tweet'
import './homepage.css'

export default function Homepage(props){

	const [tweets, setTweets] = useState([])

	function getTweets() {

		fetch("/tweets/tweets/", {
			headers: {
				Authorization: `JWT ${localStorage.getItem('token')}`
			}
		})
			.then(res => res.json())
			.then(json => {
				// https://flaviocopes.com/react-how-to-loop/
				var returnData = []
				for (const [index, value] of json.entries()){
					returnData.push(value)
				}
				setTweets(returnData)
			});
	}

	useEffect(() =>{
		getTweets()
	}, [])


	return(
		<div id="homeTweets">
			{(tweets || []).map(data => (
            	<Tweet key={data.id} data={data} username={props.username}/>
          	))}
		</div>
	)
}