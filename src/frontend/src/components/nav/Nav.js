import React from 'react';
import './nav.css'
import {Link} from 'react-router-dom'

export default function Nav(props) {
	const loggedOutNav = (
		<div id='nav'>
			<Link to='/login'>Login</Link>
			<Link to='/signup'>Signup</Link>
		</div>
	);

	const loggedInNav = (
		<div id='nav'>
			<Link to='/'>Home</Link>
			<Link to='/compose'>Compose</Link>
			<Link to='/search'>Search</Link>
			<a onClick={props.handleLogout}>Logout</a>
			<Link to={"/user/"+props.username}>{props.username}</Link>
		</div>
	);

	return (
		<div>
			{props.loggedIn 
			? loggedInNav 
			: loggedOutNav}
		</div>
	);
}