// Importa as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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
const auth = getAuth(); //configura o firebase authentication
const db = getFirestore(); //configura o firestore

//monitora o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    if (!user) return;
    //busca o id do usuário autenticado salvo no localStorage
    const loggedInUserId = localStorage.getItem('loggedInUserId') || user.uid;
    const docRef = doc(db, "users", loggedInUserId);

    //se o ID estiver no localStorage, tenta obter os dados do Firestore
     getDoc(docRef)
      .then((docSnap) => {
          if (docSnap.exists()) {
              const userData = docSnap.data();
              document.getElementById('loggedUserFName').innerText = userData.firstName || '';
              document.getElementById('loggedUserLName').innerText = userData.lastName || '';
              document.getElementById('loggedUserEmail').innerText = userData.email || '';
          }
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
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
            console.error('Error Signing out:', error);
        });
});