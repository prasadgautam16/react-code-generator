/** @format */

import React from "react";

const LoginForm = () => {
	return (
		<div>
			<form
				style={{
					padding: "20px",
					border: "1px solid #eee",
					width: "400px",
					margin: "0 auto",
				}}
				name='login-form'>
				<div style={{ "margin-bottom": "10px" }}>
					<label for='username' style={{ "margin-right": "10px" }}>
						Username
					</label>
					<input id='username' type='text' />
				</div>
				<div style={{ "margin-bottom": "10px" }}>
					<label for='password' style={{ "margin-right": "10px" }}>
						Password
					</label>
					<input id='password' type='password' />
				</div>
				<div>
					<button style={{ "margin-right": "10px" }} type='button'>
						Cancel
					</button>
					<button type='submit'>Login</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
