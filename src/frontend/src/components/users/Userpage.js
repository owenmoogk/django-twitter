import React, { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import Tweet from '../homepage/Tweet'

export default function Tweetpage(props){
	
	const [tweets, setTweets] = useState([])
	const [bio, setBio] = useState('')
	const [message, setMessage] = useState('')
	let {username} = useParams();

	function getTweets(username) {
		fetch("/tweets/userTweets/"+username+"/")
			.then(res => res.json())
			.then(json => {
				if (json.message){
					setMessage(json.message)
				}
				else{
					setBio(json.bio)
					
					// setting tweets
					var returnData = []
					for (const [index, value] of json.tweets.entries()){
						returnData.push(<Tweet key={index} data={value} />)
					}
					setTweets(returnData)
				}
			});
		}

	useEffect(() => {
		getTweets(username)
	}, [])


	return(
		<div className='user'>
			<div className='userData'>
				<h1>{username}</h1>
				<h3>{bio}</h3>
			</div>
			<div id="homeTweets">
				{tweets}
			</div>
		</div>
	)
}