import React, { useEffect, useState } from 'react';
import Nav from './nav/Nav';
import LoginForm from './users/Login';
import Register from './users/Register';
import Tweetpage from './tweet/Tweetpage'
import Homepage from './homepage/Homepage'
import Compose from './compose/Compose'
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'

// all the user stuff... massive props to
// https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a

export default function App() {

	const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false)
	const [username, setUsername] = useState('')

	useEffect(() => {
		if (loggedIn) {
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

	const handleLogout = () => {
		localStorage.removeItem('token');
		setLoggedIn(false)
		setUsername('')
	};

	return (
		<div className="App">
			<div id="leftBar">
				<Nav
					loggedIn={loggedIn}
					handleLogout={handleLogout}
					username={username}
				/>
			</div>
			<div id='mainPage'>
				<Router>
					<Switch>
						<Route path='/login'>
							<LoginForm setUsername={setUsername} setLoggedIn={setLoggedIn} loggedIn={loggedIn} username={username}/>
						</Route>
						<Route path='/signup'>
							<Register setLoggedIn={setLoggedIn} loggedIn={loggedIn} username={username}/>
						</Route>
						<Route path='/tweet/:id' children={<Tweetpage />} />
						<Route path="/compose">
							<Compose />
						</Route>
						<Route exact path='/'>
							<Homepage/>
						</Route>

					</Switch>
				</Router>
			</div>
			<div id="rightBar"></div>
		</div>
	);
}