// Import the Express module
const express = require('express');
const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');
const app = express();
const PORT = 7650;

app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json')

if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, json.stringify([]));
}

// Define a route for POST requests
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (!newUser || !newUser.username || !newUser.password) {
        return res.status(400).json({ error: 'Name and password is required."'})
    }
    let data = [];
    if (fs.existsSync(USERS_FILE)) {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    if (raw.trim() !== "") {
        data = JSON.parse(raw);
        }
    }    
    
    data.push(newUser)
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2))

    res.status(201).json({ message: 'User added' });
});

const user_info = require('./users.json')

// Define a route for user login verification
app.post('/users/login', (req, res) => {
    const { username, password } = req.body;
    
    const user = user_info.find(user => user.username === username);

    if (!user) {
        return res.status(401).json({ message: 'Username is not registered' });
    }
    if (user.password !== password) {
        return res.status(400).json({ message: 'Incorrect Password.' })
    }
    res.status(200).json({ message: 'Login Complete' })
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});