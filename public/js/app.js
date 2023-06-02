// const { response } = require("express");

console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const serach = document.querySelector('input');
    
    fetch('http://localhost:3000/weather?address=' + serach.value).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        }
        else
            messageOne.textContent = data.tempreature;
            console.log(data);
    })
})

   
})