import React, { useState } from "react"
import './compose.css'

export default function Compose(props) {

	const [content, setContent] = useState('')
	const [message, setMessage] = useState('')

	function composeTweet(e, data) {
		e.preventDefault();
		fetch('/tweets/compose/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `JWT ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data)
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
				<input type='submit' value="Post tweet"/>
			</form>
			<h2>{message}</h2>
		</div>
	)
}