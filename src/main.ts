import { connectToServer } from './socket-client';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Web Socket Client</h2>

    <input id="jwtToken" placeholder="JSON Web Token" />
    <button id="btnConnect">Connect</button>

    <br/>

    <span id="server-status">Offline</span>
    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
    
  </div>
  
`;

//connectToServer();
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

const jwtToken = document.querySelector<HTMLInputElement>('#jwtToken');
const btnConnect = document.querySelector<HTMLButtonElement>('#btnConnect');

btnConnect?.addEventListener('click', () => {
	if (jwtToken!.value.trim().length <= 0) return alert('falta jwt');

	const token: string = jwtToken!.value.trim();

	connectToServer(token);
});
