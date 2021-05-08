import React, { useState } from 'react';
import {getCookie} from '../CSRF.js'
import './auth.css'

export default function Login(props) {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')

	const handleLogin = (e, data) => {
		e.preventDefault();
		fetch('/token-auth/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': getCookie('csrftoken')
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(json => {
				if (json.token){
					localStorage.setItem('token', json.token);
					props.setLoggedIn(true)
					props.setUsername(json.user.username)
					window.location.replace('/')
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

	function notLoggedInPage(){
		return(
			<div id='loginForm'>
				<form onSubmit={e => handleLogin(e, {username:username, password:password})}>
					<h2>Log In</h2>
					<table>
						<tbody>
							<tr>
								<td>
									<label htmlFor="username">Username</label>
								</td>
								<td>
									<input
										type="text"
										name="username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="password">Password</label>
								</td>
								<td>
									<input
										type="password"
										name="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</td>
							</tr>
						</tbody>
					</table>
					<br/>
					<input type="submit" />
				</form>
				<h2>{message}</h2>
			</div>
		)
	}

	function loggedInPage(){
		return(
			<div>
				<h2>{"You are logged in as "+props.username}</h2>
			</div>
		)
	}

	return (
		<div>
		{props.loggedIn
			? loggedInPage()
			: notLoggedInPage()
		}
		</div>
	);

}