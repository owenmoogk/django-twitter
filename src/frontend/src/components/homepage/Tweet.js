import React, { useState } from "react"

export default function Tweet(props){

	return(
		<div>
			<h1>{props.data.content}</h1>
			<h4>{props.data.user}</h4>
		</div>
	)
}