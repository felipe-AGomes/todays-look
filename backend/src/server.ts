import app from './app';

const serverPort = 3333;

app.listen(serverPort, () => {
	console.log(`SERVER RUNNING ON http://localhost:${serverPort}/`);
});
