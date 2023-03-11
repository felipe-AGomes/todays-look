import React, {useState} from 'react';
import './AddCloth.css';

type Prop = {
	modal: 'active' | '';
};

function AddCloth({modal}: Prop) {
	const [image, setImage] = useState('');
	const [category, setCategory] = useState('');

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		console.log({category, image});
		setImage('');
		setCategory('');
	}

	function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
		const inputTarget = event.target;
		const file = inputTarget.files ? inputTarget.files[0] : null;

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.addEventListener('load', e => {
				const targetReader = e.target;
				const result = targetReader?.result;
				if (result && typeof result === 'string') {
					setImage(result);
				}
			});
		}
	}

	return (
		<div id='addCloth' className={`${modal}`}>
			<div className='addCloth-box'>
				<form
					className='addCloth-form'
					onSubmit={e => {
						handleSubmit(e);
					}}>
					<label htmlFor='file'>{
						image ? (
							<img src={image}/>
						) : 'IMAGEM'
					}</label>
					<input
						hidden
						type='file'
						id='file'
						onChange={handleImage}/>
					<select onChange={e => {
						setCategory(e.target.value);
					}} name='category' id='category'>
						<option defaultChecked>CATEGORIA</option>
						<option value='CAMISETA'>CAMISETA</option>
						<option value='BLUSA'>BLUSA</option>
						<option value='VESTIDO'>VESTIDO</option>
						<option value='CALÇA'>CALÇA</option>
						<option value='SHORT/SAIA'>SHORT</option>
						<option value='SHORT/SAIA'>SAIA</option>
						<option value='TÊNIS'>TÊNIS</option>
					</select>
					<button>ENVIAR</button>
				</form>
			</div>
		</div>
	);
}

export default AddCloth;
