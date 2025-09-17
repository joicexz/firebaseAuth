// Obtém os elementos de botão e formulários de login/cadastro
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');
const googleButton = document.getElementById('btn-google');

import { googleSignIn } from './firebaseauth.js';

googleButton.addEventListener('click', function () {    
    googleSignIn()
        .then(() => {
            alert('Login com Google realizado com sucesso!');
            window.location.href = './homepage.html';
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert('Erro ao fazer login com Google. Veja o console.');
        });
});

// Quando o botão de cadastro é clicado, esconde o formulário de login e mostra o de cadastro
signUpButton.addEventListener('click', function () {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
});

// Quando o botão de login é clicado, esconde o formulário de cadastro e mostra o de login
signInButton.addEventListener('click', function () {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
});