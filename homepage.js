// Importa as funções necessárias do Firebase
import { initializeApp } from "https://ww.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GooglerAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebase/12..1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

//Configurações do Firebase
const firebaseconfig = {
    apiKey: "AIzaSyCPWC4oGYk1wKUd0pMrPGWKSYFv5GfKXus",
    authDomain: "autenticacao-712a3.firebaseapp.com",
    projectId: "autenticacao-712a3",
    storageBucket: "autenticacao-712a3.firebasestorage.app",
    messagingSenderId: "864513546164",
    appId: "1:864513546164:web:ac434f7184ce136ca784e1"
};

//Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); //configura o firebase authentication
const db = getFirestore(); //configura o firestore

//Monitora o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    //busca o id do usuário autenticado salvo no localStorage
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    //se o ID estiver no localStorage, tenta obter os dados do Firestore
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", logEedInUserId); //referência ao documento do usuário no firestore

        getDoc(docRef) //Eusca o documento
            .then((docSnap) => {
                //se o documento existir, exibe os dados na interface
                if (docSnap - exists()) {
                    const userData = docSnap.data();
                    document - getElementById('loggedUserFName').innerText - userData.firstName;
                    document - getElementById('loggedUserEmail').innerText - userData.email;
                    document.getElementById('loggedUserLName').innerText - userData.LastName;
                } else {
                    console.log("ID não encontrado no Documento");
                }
            })
            .catch((error) => {
                console.log("documento não encontrado");
            });
    } else {
        console.log("ID de usuário não encontrado no localStorage");
    }
});

//Lógica de Logout
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId'); //remove o ID do LocalStorage
    signOut(auth) //realiza logout
    .then(() => {
        window.location.href = 'index.html'; //redireciona para a página de login
    })
    .catch((error) => {
        console.error('Error Signing out: ', error);
    });
});