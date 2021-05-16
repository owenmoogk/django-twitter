import React, { useState } from "react"
import { getCookie } from "../CSRF"

export default function Tweet(props){

	const [likeOverride, setLikeOverride] = useState(null)

	function likeTweet(){
		fetch('/tweets/like/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `JWT ${localStorage.getItem('token')}`,
				'X-CSRFToken': getCookie('csrftoken')
			},
			body: JSON.stringify({tweetId: props.data.id})
		})
			.then(response => {
				if (response.ok){
					setLikeOverride(true)
				}
			})
	}

	function dislikeTweet(){
		fetch('/tweets/dislike/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `JWT ${localStorage.getItem('token')}`,
				'X-CSRFToken': getCookie('csrftoken')
			},
			body: JSON.stringify({tweetId: props.data.id})
		})
			.then(response => {
				if (response.ok){
					setLikeOverride(false)
				}
			})
	}

	console.log(props.username)

	return(
		<a href={"/tweet/"+props.data.id} className="tweetLink">
			<div className='tweet'>
				<div className='tweetImage'>
					<a href={'/user/' + props.data.user}>
						<div className='imageWrapper'>
							<img src={'/media/'+props.data.user+".jpg"} onError={(e) => {e.target.style.display = 'none'}}/>
						</div>
					</a>
				</div>
				<div className='tweetText'>
					<p><a href={'/user/' + props.data.user}><span className='username'>@{props.data.user}</span></a> • <span className='time'>{props.data.time}</span></p>
					<p id='tweetContent'>{props.data.content}</p>
					<div className='icons'>
						{props.username == props.data.user
							? <span className="delete" onClick={() => deleteTweet()}>Delete</span>
							: null
						}
						{ likeOverride == null
							? props.data.liked
								? <a href='#'><span onClick={() => dislikeTweet()}>❤️</span></a>
								: <a href='#'><span onClick={() => likeTweet()}>♡</span></a>
							: likeOverride
								? <a href='#'><span onClick={() => dislikeTweet()}>❤️</span></a>
								: <a href='#'><span onClick={() => likeTweet()}>♡</span></a>
						}
				</div>
				</div>
			</div>
		</a>
	)
}