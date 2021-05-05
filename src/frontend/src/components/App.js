import React, { useEffect, useState } from 'react';
import Nav from './nav/Nav';
import LoginForm from './users/Login';
import SignupForm from './users/Register';

// all the user stuff... massive props
// https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a

export default function App() {

	const [displayed_form, set_displayed_form] = useState("")
	const [logged_in, setLoggedIn] = useState(localStorage.getItem('token') ? true : false)
	const [username, setUsername] = useState('')

	useEffect(() => {
		if (logged_in) {
			fetch('/users/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			})
				.then(res => res.json())
				.then(json => {
					setUsername(json.username)
				});
		}
	});

	const clearDisplayForm = () => {
		set_displayed_form('')
	}
	
	const handle_logout = () => {
		localStorage.removeItem('token');
		setLoggedIn(false)
		setUsername('')
	};

	const display_form = form => {
		set_displayed_form(form)
	};

	let form;
	switch (displayed_form) {
		case 'login':
			form = <LoginForm clearDisplayForm={clearDisplayForm} setLoggedIn={setLoggedIn}/>;
			break;
		case 'signup':
			form = <SignupForm clearDisplayForm={clearDisplayForm} setLoggedIn={setLoggedIn} />;
			break;
		default:
			form = null;
	}

	return (
		<div className="App">
			<Nav
				logged_in={logged_in}
				display_form={display_form}
				handle_logout={handle_logout}
			/>
			{form}
			<h3>
				{logged_in
					? `Hello, ${username}`
					: 'Please Log In'
				}
			</h3>
		</div>
	);
}