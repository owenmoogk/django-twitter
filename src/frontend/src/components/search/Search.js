import React, { useState } from "react"
import {Link} from 'react-router-dom'
import './search.css'

export default function Search(props) {

	const [searchContent, setSearchContent] = useState('')
	const [result, setResult] = useState([])

	function searchUsers(searchQuery) {
		fetch('users/searchUsers/'+searchQuery+"/")
			.then(response => response.json())
			.then(json => {
				// json is a list of users
				var returnData = []
				for (const [index, value] of json.entries()){
					returnData.push(<Link key={index} to={'/user/'+value+"/"}>{value}</Link>)
				}
				setResult(returnData)
			})
	};

	function updateSearchData(e){
		// so we dont take an empty string
		if (e.target.value){
			e.preventDefault()
			setSearchContent(e.target.value)
			searchUsers(e.target.value)
		}
		else{
			setResult([])
		}
	}

	return (
		<div id='search'>
			<input type='text' onChange={(e)=> updateSearchData(e)}/>
			<div id="searchResults">
				{result}
			</div>
		</div>
	)
}