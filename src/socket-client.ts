import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = (token: string) => {
	const urlConnection = 'http://localhost:3000/socket.io/socket.io.js';

	const manager = new Manager(urlConnection, {
		extraHeaders: {
			Authorization: token
		}
	});

	socket?.removeAllListeners();
	socket = manager.socket('/');

	addListeners();
};

const addListeners = () => {
	const serverStatusLabel =
		document.querySelector<HTMLSpanElement>('#server-status')!;
	const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul');

	const messageForm = document.querySelector<HTMLFormElement>('#message-form');
	const messageInput =
		document.querySelector<HTMLInputElement>('#message-input');

	const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul');

	socket.on('connect', () => {
		serverStatusLabel.innerHTML = 'Connected';
	});

	socket.on('disconnect', () => {
		serverStatusLabel.innerHTML = 'Disconnected';
	});

	socket.on('clients-updated', (clients: String[]) => {
		console.log({ clients });
		let clientsHtml = '';
		clients.forEach((clientId) => {
			clientsHtml += `
				<li>${clientId}</li>
			`;
		});
		clientsUl!.innerHTML = clientsHtml;
	});

	socket.on('hello-connected', (message: string) => {
		console.log(message);
	});

	messageForm?.addEventListener('submit', (event) => {
		event?.preventDefault();
		if (messageInput!.value.trim().length <= 0) return;
		socket.emit('message-from-client', { id: '', message: messageInput!.value });
		messageInput!.value = '';
	});

	socket.on(
		'messages-from-server',
		(payload: { fullName: string; message: string }) => {
			const { fullName, message } = payload;
			let newMessage = `
				<li>
					<strong>${fullName}</strong>
					<span>${message}</span>
				</li>
			`;
			const li: HTMLLIElement = document.createElement('li');
			li.innerHTML = newMessage;
			messagesUl?.append(li);
		}
	);
};
