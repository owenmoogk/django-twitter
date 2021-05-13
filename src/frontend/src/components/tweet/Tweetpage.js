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
				var el = document.getElementsByClassName('imageWrapper')[0]
				var imgSrc = '/media/'+json.user+'.jpg'
				el.innerHTML = "<img src='"+imgSrc+"' onError={(e) => {e.target.style.display = 'none'}}/>"
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
			<div className='tweetImage'>
				<a href={'/user/' + data.user}>
					<div className='imageWrapper'>
						
					</div>
				</a>
			</div>
			<div className='tweetText'>
				<p><span className='username'>@{data.user}</span> • <span className='time'>{data.time}</span></p>
				<p id='tweetContent'>{data.content}</p>
				<div className='icons'>
					{props.username == data.user
						? <span className="delete" onClick={() => deleteTweet()}>Delete</span>
						: null
					}
			</div>
			</div>
			<h2>{message}</h2>
		</div>
	)
}