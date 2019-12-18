In your postgresql, create a new database called 'eka_test'
```
CREATE DATABASE eka_test;
```

Create the teachers table
```
CREATE TABLE teachers (teacher_id VARCHAR(255) PRIMARY KEY);


CREATE TABLE classes (class_id VARCHAR(255), teacher_id VARCHAR(255), student_id VARCHAR(255), PRIMARY KEY(class_id, teacher_id, student_id));

INSERT INTO classes (class_id, teacher_id, student_id) VALUES ('c1', 't1', 's1');
INSERT INTO classes (class_id, teacher_id, student_id) VALUES ('c1', 't1', 's2');
INSERT INTO classes (class_id, teacher_id, student_id) VALUES ('c2', 't2', 's3');
INSERT INTO classes (class_id, teacher_id, student_id) VALUES ('c2', 't2', 's2');
INSERT INTO classes (class_id, teacher_id, student_id) VALUES ('c3', 't1', 's4');