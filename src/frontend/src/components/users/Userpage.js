import React, { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import Tweet from '../homepage/Tweet'

export default function Userpage(props){
	
	const [tweets, setTweets] = useState([])
	const [bio, setBio] = useState('')
	const [following, setFollowing] = useState(false)
	let {username} = useParams();

	function getTweets(username) {
		fetch("/tweets/userTweets/"+username+"/")
			.then(res => res.json())
			.then(json => {
				if (json.message){
					setMessage(json.message)
				}
				else{
					setBio(json.bio)
					
					// setting tweets
					var returnData = []
					for (const [index, value] of json.tweets.entries()){
						returnData.push(<Tweet key={index} data={value} />)
					}
					setTweets(returnData)
				}
			});
	}

	function isUserFollowing(){
		fetch("/users/userFollowings/"+props.username+"/", {
			headers: {
				Authorization: `JWT ${localStorage.getItem('token')}`
			}
		})
			.then(res => res.json())
			.then(json => {
				// https://stackoverflow.com/questions/6356122/javascript-if-in-x
				if (json.indexOf(username) >= 0){
					setFollowing(true)
				}
			});
	}

	useEffect(() => {
		getTweets(username)
	}, [])

	// k... so the first time this loads it is without props, so when the username prop is updated and does not = none then it will check if the user is following the user being rendered on the page. got it? neither do i.
	useEffect(() => {
		if (props.username){
			isUserFollowing()
		}
	}, [props.username])

	function followUser(){
		fetch('/users/follow/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `JWT ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({'username': username})
		})
			.then(response => {
				if (response.ok){
					setFollowing(true)
				}
			})
	}

	function unfollowUser(){
		fetch('/users/unfollow/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `JWT ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({'username': username})
		})
			.then(response => {
				if (response.ok){
					setFollowing(false)
				}
			})
	}


	return(
		<div className='user'>
			{!following
			? <button onClick={()=>followUser()}>follow</button>
			: <button onClick={()=>unfollowUser()}>unfollow</button>
			}
			
			<div className='userData'>
				<h1>{username}</h1>
				<h3>{bio}</h3>
			</div>
			<div id="homeTweets">
				{tweets}
			</div>
		</div>
	)
}