const readline = require('readline');
const fetch = require('node-fetch');

const PORT = 7650;
const BASE_URL = `http://localhost:${PORT}`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askMenu() {
  console.log(`\nWhat would you like to do?
1) Register
2) Login
3) Exit
  `);

  rl.question('Choose an option: ', (choice) => {
    switch (choice) {
      case '1':
        registerUser();
        break;
      case '2':
        loginUser();
        break;
      case '3':
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid choice.");
        askMenu();
    }
  });
}

function registerUser() {
  rl.question('Choose a username: ', (username) => {
    rl.question('Choose a password: ', async (password) => {
      await sendCredentials(username, password);
      askMenu();
    });
  });
}

function loginUser() {
  rl.question('Enter username: ', (username) => {
    rl.question('Enter password: ', async (password) => {
      await userLogin(username, password);
      askMenu();
    });
  });
}

async function sendCredentials(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    console.log('Server response:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function userLogin(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    console.log('Server response:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

askMenu();