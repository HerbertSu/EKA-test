const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/',(request, response) => {
    response.json({
        user: "John Doe"
    })
})

app.listen(PORT, () =>{
    console.log(`App is running on port ${PORT}`)
});

const knex = require('knex');
const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'password',
        database: 'database'
    }
});