import React, {Component} from 'react';
import './styles.css';

import ColumnItem from '../ColumnItem';

class Column extends Component{

    constructor(){
        super();
        this.state = {
            teacher: null,
        };

    };

    static getDerivedStateFromProps = (props, state) =>{
        if(props.teacher != null){
            return {teacher : true};
        };
    };

    showData = (dataList) =>{
        let components = dataList.map((obj, i) => {
            if(this.props.teacher){
                return <ColumnItem name={obj.id} key={i} backgroundColor={obj.color} teacher={true} onTeacherClick={this.props.onTeacherClick}/>
            };
            return <ColumnItem name={obj.id} key={i} backgroundColor={obj.color}/>;
        });
        return components;
    };

    render(){
        return(
            <div className="container-column">
                <h1 className="column-title">{this.props.title}</h1>

                { this.props.data ? (
                    this.showData(this.props.data)
                ) : (
                    "Loading"
                )
                }
            </div>
        )
    }
};

export default Column;