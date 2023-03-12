import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Home />
	</React.StrictMode>,
);
