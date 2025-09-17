// Importa as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAqxof5IPATabxELws9-dSJhCXcx4zGNNs",
    authDomain: "fir-auth-8fa2b.firebaseapp.com",
    projectId: "fir-auth-8fa2b",
    storageBucket: "fir-auth-8fa2b.firebasestorage.app",
    messagingSenderId: "594855099641",
    appId: "1:594855099641:web:e048b3df239d2ccf12f628",
    measurementId: "G-XZTPZNCNN8"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Função para exibir mensagens temporárias na interface
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000); // A mensagem desaparece após 5 segundos
}

// Lógica de cadastro de novos usuários
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault(); // Previne o comportamento padrão do botão

    // Captura os dados do formulário de cadastro
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth(); // Configura o serviço de autenticação
    const db = getFirestore(); // Conecta ao Firestore

    // Cria uma conta com e-mail e senha
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user; // Usuário autenticado
            const userData = { email, firstName, lastName }; // Dados do usuário para salvar

            showMessage('Conta criada com sucesso', 'signUpMessage'); // Exibe mensagem de sucesso

            // Salva os dados do usuário no Firestore
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'index.html'; // Redireciona para a página de login após cadastro
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Endereço de email já existe', 'signUpMessage');
            } else {
                showMessage('não é possível criar usuário', 'signUpMessage');
            }
        });
});

// Lógica de login de usuários existentes
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault(); // Previne o comportamento padrão do botão

    // Captura os dados do formulário de login
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth(); // Configura o serviço de autenticação

    // Realiza o login com e-mail e senha
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('usuário logado com sucesso', 'signInMessage'); // Exibe mensagem de sucesso
            const user = userCredential.user;

            // Salva o ID do usuário no localStorage
            localStorage.setItem('loggedInUserId', user.uid);

            window.location.href = 'homepage.html'; // Redireciona para a página inicial
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Email ou Senha incorreta', 'signInMessage');
            } else {
                showMessage('Essa conta não existe', 'signInMessage');
            }
        });
});

// Função de login com Google
function googleSignIn() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const db = getFirestore();

    return signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;

            localStorage.setItem('loggedInUserId', user.uid);

            const userData = {
                email: user.email,
                firstName: user.displayName?.split(" ")[0] || "",
                lastName: user.displayName?.split(" ")[1] || ""
            };

            const docRef = doc(db, "users", user.uid);
            return setDoc(docRef, userData, { merge: true })
                .then(() => {
                    console.log("Dados do usuário salvos no Firestore!");
                    window.location.href = 'homepage.html';
                })
                .catch((error) => console.error("Erro ao salvar dados:", error));
        })
        .catch((error) => console.error("Erro no login com Google:", error));
}


export { googleSignIn };
