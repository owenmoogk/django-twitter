import React from "react"
import '../index.css'
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom'
import Register from './Register'
import Nav from './nav/Nav'

export default function App(){
	
	return(
		<Router>
			<Nav />
			<Switch>

				<Route path='/register' component={Register} />
			</Switch>
		</Router>
	)
}