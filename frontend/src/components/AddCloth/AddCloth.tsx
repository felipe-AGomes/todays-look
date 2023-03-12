
import React, {useState} from 'react';
import {type Body, type Category, type ClotheDb} from '../../types';
import './AddCloth.css';

type Prop = {
	modal: 'active' | '';
	setNewClothe: (response: ClotheDb[]) => void;
};

function AddCloth({modal, setNewClothe}: Prop) {
	const [image, setImage] = useState<File>();
	const [displayedImage, setDisplayedImage] = useState<string>('');
	const [category, setCategory] = useState<Category | 'CATEGORIA'>();

	function fileReader(file: File) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener('load', e => {
			const targetReader = e.target;
			const result = targetReader?.result;
			if (result && typeof result === 'string') {
				setDisplayedImage(result);
			}
		});
	}

	function setBody(category: Category): Body {
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

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		// Event.preventDefault();
		// const formData = new FormData();
		// if (!image) {
		// 	return;
		// }

		// if (category === 'CATEGORIA' || category === undefined) {
		// 	return;
		// }

		// formData.append('imagem', image);

		// fetch('http://localhost:3333/newclothe', {
		// 	method: 'POST',
		// 	body: formData,
		// })
		// 	.then(async response => response.json())
		// 	.then(console.log)
		// 	// .then((clothes: ClotheDb[]) => {
		// 	// 	setNewClothe(clothes);
		// 	// })
		// 	.catch(err => {
		// 		console.error(err);
		// 	});

		// setDisplayedImage('');
		// setImage(undefined);
		// setCategory(undefined);
	}

	function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
		if (!event.target.files) {
			return;
		}

		setImage(event.target.files[0]);

		if (image) {
			// SetImage(image);
			fileReader(image);
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
						displayedImage ? (
							<img src={displayedImage}/>
						) : 'IMAGEM'
					}</label>
					<input
						hidden
						type='file'
						id='file'
						onChange={handleImage}/>
					<select onChange={e => {
						console.log(e.target.value);
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
					<button>ENVIAR</button>
				</form>
			</div>
		</div>
	);
}

export default AddCloth;
