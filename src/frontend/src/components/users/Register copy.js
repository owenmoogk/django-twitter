import React, { useState } from "react"

export default function Register() {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')
	const [status, setStatus] = useState('')

	function getCookie(name) {
		if (!document.cookie) {
			return null;
		}

		const xsrfCookies = document.cookie.split(';')
			.map(c => c.trim())
			.filter(c => c.startsWith(name + '='));

		if (xsrfCookies.length === 0) {
			return null;
		}
		return decodeURIComponent(xsrfCookies[0].split('=')[1]);
	}



	function register() {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				'X-CSRFToken': getCookie('csrftoken')
			},
			credentials: 'include',
			body: JSON.stringify({
				username: username,
				password: password,
				passwordConfirmation: passwordConfirmation,
			}),
		};
		fetch("/users/register/", requestOptions)
			.then((response) => response.json())
			.then((data) => setStatus(data.Message))
	}

	return (
		<div>
			<input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='Username'></input>
			<br/>
			<input type="text" onChange={(e) => setPassword(e.target.value)} placeholder='Password'></input>
			<br/>
			<input type="text" onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder='Confirm Password'></input>
			<br/>
			<button onClick={() => register()}>submit</button>
			<h1>{status}</h1>
		</div>
	)
}