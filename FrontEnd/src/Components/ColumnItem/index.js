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
              <div className="teacher" onClick={()=>this.onClickTeacher()}>
                  {this.props.name}
              </div>  
            ) : (
                <div className="notTeacher">
                    {this.props.name}
                </div>
            ))
        )
    }
};

export default ColumnItem;