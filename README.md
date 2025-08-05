# Starting
Ensure that you are running the latests version of Node.js 

### Installs via the terminal
```
npm install node-fetch
npm install express
npm install nodemon
```
# REQUEST DATA

### Examples

The endpoint is set to [localhost:7650](http://localhost:7650/).
To send data, you will need to ensure that the username and passwoard are sent along the stated url for either adding a user or requesting a user login.

Add User
```
url = 'http://localhost:7650/users'
data = {'username': 'Alice', 'password': '1234'}

response = requests.post(url, json=data)
```

Login
```
url = 'http://localhost:7650/users/login'
data = {'username': 'Alice', 'password': '1234'}

response = requests.post(url, json=data)
```

# RECEIVE DATA

Data will come back in JSON format based on the user inputs. Below are example of all the possible responses

Add User
```
message: Name and password is required.
```

```
message: User added
```

```
message: Username is not registered
```
```
message: Incorrect Password.
```
```
message: Login Complete
```

# UML SEQUENCE DIAGRAM


<img width="720" height="380" alt="image" src="https://github.com/user-attachments/assets/40cd168e-305b-4efc-b193-91cd38a990cf" />
