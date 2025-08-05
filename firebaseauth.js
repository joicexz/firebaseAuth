// Importa as funções necessárias do firebase
import { initializeApp } from "";
import { getAuth, GoogleProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "";
import { getFirestore, setDoc, doc } from "";

// Configuração do Firestore


// Inicializa o Firestore
const app = initializeApp(firebaseConfig);

// Função para exibir mensagens temporárias na interface
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000) // A mensagem desaparece após 5 segundos
}

// Lógica de cadastro de novos usuários
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault() // Previne o comportamento padrão do botão

    // Adicionar os dados do formulário de cadastro
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstname = document.getElementById('fName').value;
    const lastname = document.getElementById('lName').value;

    const auth = getAuth(); // Configura o serviço de autenticação
    const db = getFirestore(); // Conecta ao firestore

    // Cria uma conta com e-mail e senha
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user; // Usuário autenticado
            const userData = { email, firstName, lastName }; // Dados do usuário para salvar

            showMessage('Conta criada com sucesso', 'signUpMessage'); // Exibe mensagem de sucesso

            // Salva os dados do usuário no firestore
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'index.html'; // Redireciona para a página de login após o cadastro
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
                showMessage('Não é possível criar usuário', 'signUpMessage')
            }
        });
});

// Lógica de login de usuário existentes
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault(); // Previne o comportamento padrão do botão

    // Adiciona os dados do formulário de login
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const auth = getAuth(); // Configura o serviço de autenticação

    // Realiza o login com e-mail e senha
})