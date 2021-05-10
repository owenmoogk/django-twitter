import React, { useEffect, useState } from 'react';
import Nav from './nav/Nav';
import LoginForm from './users/Login';
import Register from './users/Register';
import Tweetpage from './tweet/Tweetpage'
import Homepage from './homepage/Homepage'
import Compose from './compose/Compose'
import Userpage from './users/Userpage'
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
					if (json.username){
						setUsername(json.username)
					}
					else{
						handleLogout()
					}
				});
		}
	});

	const handleLogout = () => {
		localStorage.removeItem('token');
		setLoggedIn(false)
		setUsername('')
	};

	return (
		<Router>
		<div className="App">
			<div id="leftBar">
				<Nav
					loggedIn={loggedIn}
					handleLogout={handleLogout}
					username={username}
				/>
			</div>
			<div id='mainPage'>
				<Switch>
					<Route path='/login'>
						<LoginForm setUsername={setUsername} setLoggedIn={setLoggedIn} loggedIn={loggedIn} username={username}/>
					</Route>
					<Route path='/signup'>
						<Register setLoggedIn={setLoggedIn} loggedIn={loggedIn} username={username}/>
					</Route>
					<Route path='/tweet/:id' children={<Tweetpage username={username}/>} />
					<Route path='/user/:username' children={<Userpage/>} />
					<Route path="/compose">
						<Compose />
					</Route>
					<Route exact path='/'>
						<Homepage/>
					</Route>
				</Switch>
			</div>
			<div id="rightBar"></div>
		</div>
		</Router>
	);
}