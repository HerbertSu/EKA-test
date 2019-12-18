import React, {Component} from 'react';
import './styles.css'

import {connect} from 'react-redux';

import {setUserName} from '../redux/actions/userActions';

const mapStateToProps = (store) => {
    return {
        userName: store.userReducer.userName,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserName: (name) => dispatch(setUserName(name))
    };
};


class App extends Component{
    
    constructor(){
        super();
        this.state = {
            user: null,
            fetching: null,
            fetched: false,
            error: false,
        };
    };

    onPress = () => {
        this.props.setUserName("bob");
        console.log(this.props.userName)
    };

    componentDidMount = () => {
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(user => this.setState({user: user.user}))


            // To use async/await in componentDidMount, download @babel/plugin-transform-runtime and @babel/runtime
            // console.log("before")
            // let res = await fetch('http://localhost:3000/')
            // let name = await response.json();
            // console.log("after", name)
    };

    render(){
        return(
            <div id="container-app">
                <h1>Hello World!</h1>
                {this.state.user}
                {this.props.userName}
                <button onClick={()=>{this.onPress()}}>Click</button>
            </div>
        );
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);