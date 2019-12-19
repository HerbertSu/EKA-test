import React, {Component} from 'react';
import './styles.css';

class ColumnItem extends Component{
    // constructor(){
    //     super();
    //     this.state = {
    //         id : null,
    //         teacher: false
    //     };
    // };
    
    // static getDerivedStateFromProps(props, state){
    //     if(props.teacher !== null){
    //         return {teacher: true}
    //     }
    // };

    onClickTeacher = () => {
        if(this.props.onTeacherClick != null){
            this.props.onTeacherClick(this.props.name);
        }
    }

    render(){
        return(
            (this.props.teacher === true ? (
                this.props.backgroundColor !== null ? (
                    <div className="teacher" style={{backgroundColor : `${this.props.backgroundColor}`}} onClick={()=>this.onClickTeacher(this.props.name)}>
                        {this.props.name}
                    </div>
                ) : (
                    <div className="teacher" onClick={()=>this.onClickTeacher(this.props.name)}>
                        {this.props.name}
                    </div>
                )
            ) : (
                this.props.backgroundColor !== null ? (
                    <div className="notTeacher" style={{backgroundColor : `${this.props.backgroundColor}`}}>
                        {this.props.name}
                    </div>
                ) : (
                    <div className="notTeacher">
                        {this.props.name}
                    </div>
                )
            )
            )                
        )
    }
};

export default ColumnItem;