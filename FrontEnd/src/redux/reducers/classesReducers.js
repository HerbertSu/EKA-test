export const classesReducers = (state={classes: null}, action) => {
    switch(action.type){
        case "SET_CLASSES": {
            return {...state, classes: action.payload};
        }
        default : {
            return state;
        };
    };
};