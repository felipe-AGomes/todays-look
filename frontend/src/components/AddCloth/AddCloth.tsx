import React, {useEffect, useState} from 'react';
import {type Body, type Clothe} from '../../types';
import './AddCloth.css';

type Prop = {
	modal: 'active' | '';
	updateClothes: () => void;
};

function AddCloth({modal, updateClothes}: Prop) {
	const [image, setImage] = useState<File>();
	const [displayedImage, setDisplayedImage] = useState<string>('');
	const [category, setCategory] = useState<string>('CATEGORIA');

	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.addEventListener('load', e => {
				const targetReader = e.target;
				const result = targetReader?.result;
				if (result && typeof result === 'string') {
					setDisplayedImage(result);
				}
			});
		}
	}, [image]);

	function setBody(): Body {
		if (category === 'CALÇA' || category === 'SHORTS/SAIA') {
			return 'legs';
		}

		if (category === 'BLUSA' || category === 'CAMISETA') {
			return 'body';
		}

		if (category === 'CALÇADO') {
			return 'shoes';
		}

		return 'bodyLegs';
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData();
		if (!image) {
			return;
		}

		if (category === 'CATEGORIA' || category === undefined) {
			return;
		}

		formData.append('category', category);
		formData.append('body', setBody());
		formData.append('image', image);

		const response = await fetch('http://localhost:3333/upload', {
			method: 'POST',
			body: formData,
		});

		const data = await response.json() as Clothe;

		console.log(data);
		updateClothes();

		setDisplayedImage('');
		setImage(undefined);
		setCategory('CATEGORIA');
	}

	async function backgroundRemove(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault();
		const formData = new FormData();
		if (!image) {
			return;
		}

		formData.append('image', image);
	}

	return (
		<div id='addCloth' className={`${modal}`}>
			<div className='addCloth-box'>
				<form
					className='addCloth-form'
					onSubmit={async e => {
						await handleSubmit(e);
					}}>
					<label htmlFor='file'>{
						displayedImage ? (
							<img src={displayedImage}/>
						) : 'IMAGEM'
					}</label>
					<input
						hidden
						type='file'
						id='file'
						onChange={e => {
							setImage(e.target.files?.[0]);
						}}/>
					<select onChange={e => {
						setCategory(e.target.value);
					}} name='category' id='category'>
						<option defaultChecked>CATEGORIA</option>
						<option value='CAMISETA'>CAMISETA</option>
						<option value='BLUSA'>BLUSA</option>
						<option value='VESTIDO'>VESTIDO</option>
						<option value='CALÇA'>CALÇA</option>
						<option value='SHORTS/SAIA'>SHORT</option>
						<option value='SHORTS/SAIA'>SAIA</option>
						<option value='CALÇADO'>CALÇADO</option>
					</select>
					<button onClick={backgroundRemove}>REMOVER FUNDO</button>
					<button type='submit'>ENVIAR</button>
				</form>
			</div>
		</div>
	);
}

export default AddCloth;
