import React, { useState } from "react"
import { getCookie } from "../CSRF"

export default function Tweet(props){

	const [likeOverride, setLikeOverride] = useState(null)
	const [retweetOverride, setRetweetOverride] = useState(null)

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

	function retweet(){
		fetch('/tweets/retweet/', {
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
					setRetweetOverride(true)
				}
			})
	}

	function undoRetweet(){
		fetch('/tweets/undoRetweet/', {
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
					setRetweetOverride(false)
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

	function renderIcons(){
		return(
			<div className='icons'>

				{/* likes */}
				<a href='#' onClick={(e)=> e.preventDefault()}>
					{likeOverride == null
						? props.data.liked
							?  <span onClick={() => dislikeTweet()}> ❤️ </span>
							: <span onClick={() => likeTweet()}> ♡ </span>
						: likeOverride
							? <span onClick={() => dislikeTweet()}> ❤️ </span>
							: <span onClick={() => likeTweet()}> ♡ </span>
					}
				</a>

				{/* delete or rt */}
				<a href='#' onClick={(e)=> e.preventDefault()}>
					{props.username == props.data.user
						? <span className="delete" onClick={() => deleteTweet()}>Delete</span>
						: retweetOverride == null
							? props.data.userHasRetweeted
								? <span onClick={() => undoRetweet()}>⏪</span>
								: <span onClick={() => retweet()}>🔁</span>
							: retweetOverride
								? <span onClick={() => undoRetweet()}>⏪</span>
								: <span onClick={() => retweet()}>🔁</span>
					}
				</a>

			</div>
		)
	}

	function tweetBody(){
		return(
			<div className='tweet'>

				{/* profile picture for tweet user */}
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

					{/* if this is the is an original render and is a retweet of something else... */}
					{props.data.isRetweet && !props.omitIcons
						? <Tweet username={props.username} data={props.data.retweetContent} omitIcons={true}/>
						: null
					}

					{/* icons */}
					{props.omitIcons
						? null
						: renderIcons()
					}
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