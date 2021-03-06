import React, { useState } from 'react';
import {getCookie} from '../CSRF.js'
import './auth.css'

export default function Register(props) {
	
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setpasswordConfirm] = useState('')
	const [message, setMessage] = useState('')

	const handleSignup = (e, data, passwordConfirm) => {
		e.preventDefault();
		if (data.password != passwordConfirm){
			setMessage("Passwords do not match")
			return
		}
		fetch('/users/users/', {
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
					setUsername(json.username)
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
			<div>
				<form onSubmit={e => handleSignup(e, {username:username, password:password}, passwordConfirm)}>
					<h4>Sign Up</h4>
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
							<tr>
								<td>
									<label htmlFor="password">Confirm Password</label>
								</td>
								<td>
								<input
									type="password"
									name="passwordConfirm"
									value={passwordConfirm}
									onChange={(e) => setpasswordConfirm(e.target.value)}
								/>
								</td>
							</tr>
						</tbody>
					</table>
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