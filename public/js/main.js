const chatForm = document.getElementById('chat-form');
//constante que toma el estilo del elemento de mi document
const chatMessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


//obteniendo username y room del URL
const {username,room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


const socket = io();


//Unirme a la sala
socket.emit('joinRoom', {username, room});


socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
});


socket.on('message', message => {

    // console.log(message);
    outputMessage(message);

    //Top del scroll
    chatMessage.scrollTop = chatMessage.scrollHeight;

});


chatForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    
    //Obteniendo el valor o texto del input
    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);


    //limpiar input y mantener el focus en el input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

    // console.log(msg);
});


function outputMessage(msg){
    const div = document.createElement('div');

    div.classList.add('message');

    div.innerHTML = `<p class = "meta"> ${msg.username} <span> ${msg.time} </span></p>
    <p class = "text"> ${msg.text} </p> `;

    document.querySelector('.chat-messages').appendChild(div);
};


document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('¿Estas seguro que quieres salir?');

    if (leaveRoom) {
        window.location = '../index.html';
    };
});


//Agregar el nombre de la sala
function outputRoomName(room) {
    roomName.innerHTML = room;
}

//Agregar el nombre de los usuarios
function outputUsers(users) {
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}