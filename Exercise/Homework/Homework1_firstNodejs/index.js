const express = require('express') //thư viện đã cài đặt ban đầu npm init... ->dependence 
const app = express()
const port = 3000
let users = [
    {
        id: 1,
        name: 'Anna',
        age:22
    },
    {
        id: 2,
        name: 'Belle',
        age:22
    },
    {
        id: 3,
        name: 'Cindy',
        age:25
    }
]

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
    console.log(req.query);
    res.send(users)
})

app.get('/users/:id', (req, res) => { 
    console.log(req.params.id);
    const user = users.filter(user => user.id === parseInt(req.params.id)) 
    res.send(user)
})

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        ...req.body
    };
    users.push(newUser);
    console.log('Post:', req.body);
    res.send(users)
});


app.put('/users/:id', (req, res) => {
    console.log('Put:', req.body);
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        users[userIndex] = { id: parseInt(req.params.id), ...req.body };
    } else {
        res.status(404).send('NOT FOUND!!');
    }
    res.send(users)
});


app.delete('/users/:id', (req, res) => {
    console.log('Delete:', req.body);
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
    } else {
        res.status(404).send('NOT FOUND!!');
    }
    res.send(users)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})