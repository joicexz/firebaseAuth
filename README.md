# Sistema de Login com Firebase

Este projeto implementa autenticação de usuários usando Firebase, com suporte para **login por e-mail/senha** e **login com Google**, além de armazenamento de dados no Firestore.

## Funcionalidades

- Cadastro e login com **e-mail e senha**.
- Login com **conta Google**.
- Redirecionamento para a **homepage** após login bem-sucedido.

---

## Tecnologias Utilizadas

- HTML, CSS e JavaScript
- Firebase Authentication
- Firebase Firestore

---

## Estrutura de Arquivos

- `index.html` → Página de cadastro e login.
- `style.css` → Estilos da interface.
- `firebaseauth.js` → Lógica de autenticação e cadastro.
- `script.js` → Manipulação do DOM e ligação do botão de login com Google.
- `homepage.html` → Página inicial após login.
- `homepage.js` → Recupera e exibe dados do usuário no Firestore.

---

## Login por E-mail e Senha

1. O usuário preenche o formulário com **nome, sobrenome, e-mail e senha**.
2. A função `createUserWithEmailAndPassword()` do Firebase Authentication cria o usuário.
3. Um documento no **Firestore** é criado com os dados do usuário (`firstName`, `lastName`, `email`) usando `setDoc`.
4. No login, a função `signInWithEmailAndPassword()` autentica o usuário.
5. O `uid` do usuário é salvo no `localStorage` e utilizado para recuperar os dados do Firestore na homepage.

---

## Login com Google

1. O usuário clica no botão **Google**.
2. A função `signInWithPopup()` do Firebase Authentication abre a janela de login do Google.
3. Ao concluir o login, é criado (ou atualizado) um documento no Firestore com os dados do usuário:
   - `email` → do Google
   - `firstName` → primeira palavra do `displayName`
   - `lastName` → segunda palavra do `displayName`
4. O `uid` do usuário é salvo no `localStorage` e utilizado para recuperar os dados na homepage.