import React, {Component} from 'react';

class ColumnItem extends Component{
    constructor(){
        super();
        this.state = {
            id : this.props.name
        };
    };
    
    render(){
        return(
            <div>
                {this.props.name}
            </div>
        )
    }
};

export default ColumnItem;