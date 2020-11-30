/** @format */

import React from "react";

const ContactUs = () => {
	return (
		<div>
			<form
				style={{
					padding: "40px",
					border: "1px solid #eee",
					width: "200px",
					margin: "0 auto",
				}}
				name='contact-us'>
				<input
					id='name'
					style={{ width: "100%", "margin-bottom": "10px" }}
					placeholder='Your Name'
					type='text'
				/>
				<input
					id='email'
					style={{ width: "100%", "margin-bottom": "10px" }}
					placeholder='Email'
					type='email'
				/>
				<textarea
					id='message'
					rows='5'
					style={{ width: "100%", "margin-bottom": "10px" }}
					placeholder='Message'
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default ContactUs;
