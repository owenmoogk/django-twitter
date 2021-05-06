import React, { useState } from "react"

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
		<div>
			<form onSubmit={e => composeTweet(e, { content: content })}>
				<input
					type='text'
					onChange={(e) => setContent(e.target.value)}
					value={content}
				>
				</input>
				<input type='submit' />
			</form>
			<h2>{message}</h2>
		</div>
	)
}