import React, {Component} from "react"
import {render} from 'react-dom'
import '../css/index.css'

export default function App(){
	

	return(<h1>Testing react codeeee</h1>)
}

const appDiv = document.getElementById('app')
render(<App/>, appDiv)