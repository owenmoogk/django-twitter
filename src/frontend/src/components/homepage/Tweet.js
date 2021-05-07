import React, { useState } from "react"

export default function Tweet(props){

	return(
		<a href={"/tweet/"+props.data.id} className="tweetLink">
			<div className='tweet'>
				<p><span className='username'>@{props.data.user}</span> • <span className='time'>{props.data.time}</span></p>
				<p id='tweetContent'>{props.data.content}</p>
			</div>
		</a>
		
	)
}