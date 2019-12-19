import React, {Component} from 'react';
import './styles.css'

import {connect} from 'react-redux';

import {setUserName} from '../redux/actions/userActions';

import {setTeachers} from '../redux/actions/teachersActions';
import {setStudents} from '../redux/actions/studentsActions';
import {setClasses} from '../redux/actions/classesActions';

import Column from './Column';

import {contains} from '../lib/arrayOfObjects';


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
            selectedTeachers: [],
            selectedClasses: [],
            selectedStudents: []
        };
    };

    onTeacherClick = async (id) => {
        // If selected teacher is already in list,
        if(this.state.selectedTeachers.includes(id)){
            for(let i = 0; i < this.state.selectedTeachers.length; i++){
                let copy = this.state.selectedTeachers;
                let index = copy.indexOf(id);
                if (index > -1) {
                    copy.splice(index, 1);
                };
                this.setState({selectedTeachers : copy});
            };

            let copyTeachers = [...this.props.teachers];
            let copyStudents = [...this.props.students];
            let copyClasses = [...this.props.classes];

            let tIndex = contains(id, copyTeachers);
            copyTeachers[tIndex].color = null;

            let copySelectedClasses = [...this.state.selectedClasses];
            let copySelectedStudents = [...this.state.selectedStudents];

            let cI = contains(id, copySelectedClasses);

            if(cI != null){
                let selectedClassesForId = copySelectedClasses[cI].selectedClasses;
                for(let i = 0; i < selectedClassesForId.length; i++){
                    let classSelected = selectedClassesForId[i].class_id;
                    let cIndex = contains(classSelected, copyClasses);

                    if(cIndex != null){
                        copyClasses[cIndex].color = null;
                    };
                };
                copySelectedClasses.slice(cI,1);
            };

            let sI = contains(id, copySelectedStudents);
            if(sI != null){
                let selectedStudentsForId = copySelectedStudents[sI].selectedStudents;
                for(let i = 0; i < selectedStudentsForId.length; i++){
                    let studentSelected = selectedStudentsForId[i].student_id;
                    let sIndex = contains(studentSelected, copyStudents);
                    if(sIndex != null){
                        copyStudents[sIndex].color = null;
                    };
                };
                copySelectedStudents.slice(sI, 1);
            };
            
            this.props.setClasses(copyClasses);
            this.props.setTeachers(copyTeachers);
            this.props.setStudents(copyStudents);

            this.setState({
                selectedClasses: copySelectedClasses,
                selectedStudents: copySelectedStudents
            });

        }else{
            let copy = this.state.selectedTeachers;
            copy.push(id);
            this.setState({
                selectedTeachers: copy
            });
            
            let randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

            let res = await fetch('http://localhost:3000/getStudentsGivenTeaacher', {
                method : 'POST',
                    body : JSON.stringify({
                        teacher_id : id
                    }),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                });
            let classAndStudents = await res.json();

            let copyTeachers = [...this.props.teachers];
            let copyStudents = [...this.props.students];
            let copyClasses = [...this.props.classes];

            let tIndex = contains(id, copyTeachers);
            copyTeachers[tIndex].color = randomColor;

            for(let i = 0; i < classAndStudents.classes.length; i++){
                let id = classAndStudents.classes[i].class_id;
                let cIndex = contains(id, copyClasses);
                if(cIndex !== null){
                    copyClasses[cIndex].color = randomColor;
                };
            };
            
            for(let i = 0; i < classAndStudents.students.length; i++){
                let id = classAndStudents.students[i].student_id;
                let sIndex = contains(id, copyStudents);
                if(sIndex !== null){
                    copyStudents[sIndex].color = randomColor;
                };
            };
            
            this.props.setClasses(copyClasses);
            this.props.setTeachers(copyTeachers);
            this.props.setStudents(copyStudents);

            let selectedClasses = [...this.state.selectedClasses];
            selectedClasses.push({
                id: id,
                selectedClasses : classAndStudents.classes
            });

            let selectedStudents = [...this.state.selectedStudents];
            selectedStudents.push({
                id: id,
                selectedStudents : classAndStudents.students
            });
            
            this.setState({
                selectedClasses: selectedClasses,
                selectedStudents: selectedStudents
            });
        };
    };

    setSelectedTeachers = (teachers) => {
        this.setState({selectedTeachers: teachers})
    };
    
    setSelectedClassesAndStudents = (cAndS) => {
        this.setState({ selectedClassesAndStudents: cAndS});
    };

    onPress = () => {
        this.props.setUserName("bob");
        console.log(this.props.userName)
    };

    componentDidMount = () => {
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(obj => {
                let teachers = [];
                let students = [];
                let classes = [];

                for(let i = 0; i < obj.teachers.length; i++){
                    teachers.push({
                        id: obj.teachers[i].teacher_id,
                        color: null
                    });
                };

                for(let i = 0; i < obj.students.length; i++){
                    students.push({
                        id: obj.students[i].student_id,
                        color: null
                    });
                };

                for(let i = 0; i < obj.classes.length; i++){
                    classes.push({
                        id: obj.classes[i].class_id,
                        color: null
                    });
                };

                console.log(teachers, classes,students)
                this.props.setTeachers(teachers);
                this.props.setStudents(students);
                this.props.setClasses(classes);
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
                <Column title={"Teachers"} data={this.props.teachers} teacher={true} onTeacherClick={this.onTeacherClick}/>
                <Column title={"Classes"} data = {this.props.classes}/>
                <Column title={"Students"} data={this.props.students}/>
            </div>
        );
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);