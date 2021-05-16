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

	function deleteTweet() {
		fetch('/tweets/delete/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `JWT ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({tweetId: props.data.id})
		})
			.then(response => {
				if (response.ok){
					if (props.tweetPage){
						// send home if on the tweet page
						window.location.replace('/')
					}
					else{
						// reload to get the updates
						window.location.reload()
					}
				}
				return(response.json())
			})
			.then(json => {
				console.log(json)
			})
	};

	function tweetBody(){
		return(
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
							? <a href='#'><span className="delete" onClick={() => deleteTweet()}>Delete</span></a>
							: null
						}
						{likeOverride == null
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
		)
	}

	return(
		<div>
			{props.tweetPage
				? tweetBody()
				: <a href={"/tweet/"+props.data.id} className="tweetLink">{tweetBody()}</a>
			}
		</div>
	)
}