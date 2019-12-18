const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();

const knex = require('knex');
const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'password',
        database: 'eka_test'
    }
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (request, response) => {
    let teachers = await postgres('classes')
        .distinct('teacher_id');
    let students = await postgres('classes')
        .distinct('student_id');
    let classes = await postgres('classes')
        .distinct('class_id');
    response.send({
        teachers: teachers,
        students: students,
        classes: classes
    });
});

app.get('/getStudentsGivenTeaacher', async (request, response) => {
    let teacher_id = request.body.teacher_id;
    let res = await postgres('classes')
        .select('class_id', 'student_id')
        .where({
            teacher_id : teacher_id
        });
    response.send(res)
})

app.listen(PORT, () =>{
    console.log(`App is running on port ${PORT}`)
});

