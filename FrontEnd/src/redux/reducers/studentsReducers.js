export const studentsReducer = (state={students: null}, action) => {
    switch(action.type){
        case "SET_STUDENTS": {
            return {...state, students: action.payload};
        }
        default : {
            return state;
        };
    };
};