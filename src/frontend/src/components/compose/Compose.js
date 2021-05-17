import React, { useState, useEffect } from "react"
import {useParams} from 'react-router-dom'
import Tweet from "../tweet/Tweet"
import './compose.css'

export default function Compose(props) {

	const [content, setContent] = useState('')
	const [message, setMessage] = useState('')
	const [data, setData] = useState()

	let {tweetId} = useParams();

	function composeTweet(e, formData) {
		e.preventDefault();

		// retweet request
		if (tweetId){
			formData.tweetId = tweetId
			fetch('/tweets/retweet/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `JWT ${localStorage.getItem('token')}`
				},
				body: JSON.stringify(formData)
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
		}

		else{
			fetch('/tweets/compose/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `JWT ${localStorage.getItem('token')}`
				},
				body: JSON.stringify(formData)
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
		}
	};

	function getTweet(tweetId) {
		fetch("/tweets/tweet/"+tweetId+"/", {
			headers: {
				Authorization: `JWT ${localStorage.getItem('token')}`
			}
		})
			.then(res => res.json())
			.then(json => {
				setData(json)
				console.log(json)
				var el = document.getElementsByClassName('imageWrapper')[0]
				var imgSrc = '/media/'+json.user+'.jpg'
				el.innerHTML = "<img src='"+imgSrc+"' onError=\"this.style.display = \'none\'\"/>"
			});
	}

	useEffect(() => {
		if (tweetId){
			getTweet(tweetId)
		}
	}, [])

	return (
		<div id='compose'>
			<form onSubmit={e => composeTweet(e, { content: content })}>
				<textarea
					maxLength="256"
					onChange={(e) => setContent(e.target.value)}
					value={content}
					placeholder="What's happening..."
				>
				</textarea>
				<br/>
				{ (!content & tweetId)
					? <input type='submit' value="Post without comment"/>
					: <input type='submit' value="Post tweet"/>
				}
			</form>
			<h2>{message}</h2>
			{data
				?<Tweet data={data} omitIcons={true} username={props.username}/>
				: null
			}
		</div>
	)
}