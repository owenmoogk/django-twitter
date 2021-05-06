import React from 'react';

export default function Nav(props) {
	const loggedOutNav = (
		<div>
			<a href='/login'><p>Login</p></a>
			<a href='/signup'><p>Signup</p></a>
		</div>
	);

	const loggedInNav = (
		<div>
			<a onClick={props.handleLogout}><p>Logout</p></a>
			<a href='/compose'><p>Compose</p></a>
		</div>
	);

	return <div>{props.loggedIn ? loggedInNav : loggedOutNav}</div>;
}