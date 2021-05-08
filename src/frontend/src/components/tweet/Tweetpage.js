import React, { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import './tweet.css'

export default function Tweetpage(props){
	
	const [message, setMessage] = useState('')
	const [data, setContent] = useState('')
	let {id} = useParams();

	function getTweet(tweetId) {
		fetch("/tweets/tweet/"+tweetId+"/")
			.then(res => res.json())
			.then(json => {
				setContent(json)
			});
	}

	function deleteTweet() {

		var bodyData = {
			tweetId: id
		}

		fetch('/tweets/delete/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `JWT ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(bodyData)
		})
			.then(response => {
				if (response.ok){
					window.location.replace('/')
				}
					return(response.json())
			})
			.then(json => {
				setMessage(json.message)
			})
	};

	useEffect(() => {
		getTweet(id)
	}, [])


	return(
		<div className='tweet'>
			<p><span className='username'>@{data.user}</span> • <span className='time'>{data.time}</span></p>
			<p id='tweetContent'>{data.content}</p>
			<div className='icons'>
				{props.username == data.user
					? <span className="delete" onClick={() => deleteTweet()}>Delete</span>
					: null
				}
			</div>
			<h2>{message}</h2>
		</div>
	)
}