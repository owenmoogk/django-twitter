import React, { useState } from "react"

export default function Tweet(props){

	return(
		<a href={"/tweet/"+props.data.id} className="tweetLink">
			<div className='tweet'>
				<p><a href={'/user/' + props.data.user}><span className='username'>@{props.data.user}</span></a> • <span className='time'>{props.data.time}</span></p>
				<p id='tweetContent'>{props.data.content}</p>
			</div>
		</a>
	)
}