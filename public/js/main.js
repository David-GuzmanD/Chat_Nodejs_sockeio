const chatForm = document.getElementById('chat-form');
const socket = io();

socket.on('message', message => {

    // console.log(message);
    outputMessage(message);

});

chatForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    
    //Obteniendo el valor o texto del input
    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);

    // console.log(msg);
});

function outputMessage(msg){
    const div = document.createElement('div');

    div.classList.add('message');
    div.innerHTML = `<p class = "meta"> David <span>9:12pm </span></p>
    <p class = "text"> ${msg} </p> `;

    document.querySelector('.chat-messages').appendChild(div);
};