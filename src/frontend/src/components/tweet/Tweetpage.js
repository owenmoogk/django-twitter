import React, { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import './tweet.css'
import Tweet from './Tweet'

export default function Tweetpage(props){
	
	const [message, setMessage] = useState('')
	const [data, setContent] = useState('')
	let {id} = useParams();

	function getTweet(tweetId) {
		fetch("/tweets/tweet/"+tweetId+"/", {
			headers: {
				Authorization: `JWT ${localStorage.getItem('token')}`
			}
		})
			.then(res => res.json())
			.then(json => {
				setContent(json)
				var el = document.getElementsByClassName('imageWrapper')[0]
				var imgSrc = '/media/'+json.user+'.jpg'
				el.innerHTML = "<img src='"+imgSrc+"' onError=\"this.style.display = \'none\'\"/>"
			});
	}

	useEffect(() => {
		getTweet(id)
	}, [])


	return(
		<div>
			<Tweet data={data} username={props.username} tweetPage={true}/>
			<h2>{message}</h2>
		</div>
	)
}