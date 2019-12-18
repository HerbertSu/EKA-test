const knex = require('knex');
const fs = require('fs');

( async () => {
    const postgres = knex({
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'password',
            database: 'eka_test'
        }
    });

    let teacherNames = fs.readFileSync('../data/teachers.txt').toString().split('\r\n');
    let classNames = fs.readFileSync('../data/classes.txt').toString().split('\r\n');
    let studentNames = fs.readFileSync('../data/students.txt').toString().split('\r\n');
    
    // let createTeachers = await postgres.schema.raw(`CREATE TABLE IF NOT EXISTS teachers (teacher_id VARCHAR(255) PRIMARY KEY, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL);`)
    // let createStudents = await postgres.schema.raw(`CREATE TABLE IF NOT EXISTS students (student_id VARCHAR(255) PRIMARY KEY, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL);`)
    // let createClasses = await postgres.schema.raw(`CREATE TABLE IF NOT EXISTS classes (class_id VARCHAR(255) UNIQUE NOT NULL, teacher_id VARCHAR(255) REFERENCES teachers(teacher_id), student_id VARCHAR(255) REFERENCES students(student_id));`)

    for(let i = 0; i < teacherNames.length; i++){
        await postgres('teachers')
            .insert({
                teacher_id : `t${i}`,

            })

    }
    

} )()
