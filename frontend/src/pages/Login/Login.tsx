/* eslint-disable @typescript-eslint/object-curly-spacing */
import React, { useState } from 'react';
import './Login.css';

function Login() {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		console.log({ email, password });
		setEmail('');
		setPassword('');
	}

	return (
		<main id='login'>
			<div className='login-box'>
				<div className='image-box'>
					<img src='./vite.svg' />
				</div>
				<h1>Login</h1>
				<form
					onSubmit={handleSubmit}
					className='login-form'>
					<label htmlFor='email'>E-mail</label>
					<input
						type='text'
						name='email'
						id='email'
						value={email}
						onChange={e => {
							setEmail(e.target.value);
						}}
					/>
					<label htmlFor='password'>Senha</label>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
					<button type='submit'>ENVIAR</button>
					<p>Não tem uma conta? <span><a href='#'>Crie sua conta</a></span></p>
				</form>
			</div>
		</main>
	);
}

export default Login;
