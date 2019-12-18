import React, {Component} from 'react';
import './styles.css'

import {connect} from 'react-redux';

import {setUserName} from '../redux/actions/userActions';

import {setTeachers} from '../redux/actions/teachersActions';
import {setStudents} from '../redux/actions/studentsActions';
import {setClasses} from '../redux/actions/classesActions';

import Column from './Column';


const mapStateToProps = (store) => {
    return {
        userName: store.userReducer.userName,
        teachers: store.teachersReducer.teachers,
        classes: store.classesReducers.classes,
        students: store.studentsReducer.students
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserName: (name) => dispatch(setUserName(name)),
        setTeachers: (list) => dispatch(setTeachers(list)),
        setStudents: (list) => dispatch(setStudents(list)),
        setClasses: (list) => dispatch(setClasses(list))
    };
};


class App extends Component{
    
    constructor(){
        super();
        this.state = {
            selectedTeachers: []
        };
    };

    onPress = () => {
        this.props.setUserName("bob");
        console.log(this.props.userName)
    };

    componentDidMount = () => {
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(obj => {
                let teachers = obj.teachers.map((teacherObj) => {
                    return teacherObj.teacher_id;
                });
                let students = obj.students.map((studentObj) => {
                    return studentObj.student_id;
                });
                let classes = obj.classes.map((classObj) => {
                    return classObj.class_id;
                });
                console.log(teachers, classes,students)
                this.props.setTeachers(teachers);
                this.props.setStudents(students);
                this.props.setClasses(classes);
                // this.setState({
                //     teachers: teachers,
                //     students: students,
                //     classes: classes
                // })
            }
        );


            // To use async/await in componentDidMount, download @babel/plugin-transform-runtime and @babel/runtime
            // console.log("before")
            // let res = await fetch('http://localhost:3000/')
            // let name = await response.json();
            // console.log("after", name)
    };

    render(){
        return(
            <div id="container-app">
                {/* <button onClick={()=>{this.onPress()}}>Click</button> */}
                <Column title={"Teachers"} data={this.props.teachers} teacher={true}/>
                <Column title={"Classes"} data = {this.props.classes}/>
                <Column title={"Students"} data={this.props.students}/>
            </div>
        );
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);