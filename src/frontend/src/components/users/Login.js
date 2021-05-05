import React, { useState } from 'react';

export default function Login(props) {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')

	const handleLogin = (e, data) => {
		e.preventDefault();
		fetch('/token-auth/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(json => {
				if (json.token){
					localStorage.setItem('token', json.token);
					props.setLoggedIn(true)
					props.clearDisplayForm()
					setUsername(json.user.username)
				}
				else{
					// https://www.geeksforgeeks.org/how-to-get-the-first-key-name-of-a-javascript-object/
					var key;
					for (var k in json) {
						key = k;
						break;
					}
					setMessage(json[key][0])
				}
			});
	};

	return (
		<div>
			<form onSubmit={e => handleLogin(e, {username:username, password:password})}>
				<h4>Log In</h4>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input type="submit" />
			</form>
			<br/>
			<h2>{message}</h2>
		</div>
	);

}