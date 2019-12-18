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
        let components = dataList.map((id, i) => {
            return <ColumnItem name={id} key={i}/>;
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