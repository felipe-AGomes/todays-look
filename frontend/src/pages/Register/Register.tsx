import React, {useState} from 'react';
import './Register.css';

function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	function handleSubmit(event: React.FormEvent): void {
		event.preventDefault();
		console.log({email, password, password2});
		setEmail('');
		setPassword('');
		setPassword2('');
	}

	return (
		<main id='register'>
			<div className='register-box'>
				<div className='image-box'>
					<img src='./vite.svg' />
				</div>
				<h1>Cadastro</h1>
				<form onSubmit={handleSubmit} className='register-form'>
					<label htmlFor='email'>E-mail</label>
					<input type='text' name='email' id='email' value={email} onChange={e => {
						setEmail(e.target.value);
					}} />
					<label htmlFor='password'>Senha</label>
					<input type='password' name='password' id='password' value={password} onChange={e => {
						setPassword(e.target.value);
					}} />
					<label htmlFor='password2'>Repita a senha</label>
					<input type='password' name='password' id='password2' value={password2} onChange={e => {
						setPassword2(e.target.value);
					}} />
					<button type='submit'>ENVIAR</button>
				</form>
			</div>
		</main>
	);
}

export default Register;
