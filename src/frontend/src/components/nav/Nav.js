import React from 'react';

export default function Nav(props) {
	const loggedOutNav = (
		<div>
			<a href='/login'><p>Login</p></a>
			<a href='/signup'><p>Signup</p></a>
		</div>
	);

	const loggedInNav = (
		<ul>
			<li onClick={props.handleLogout}>Logout</li>
		</ul>
	);

	return <div>{props.loggedIn ? loggedInNav : loggedOutNav}</div>;
}