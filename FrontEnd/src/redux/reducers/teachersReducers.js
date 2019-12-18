export const teachersReducer = (state={teachers: null}, action) => {
    switch(action.type){
        case "SET_TEACHERS": {
            return {...state, teachers: action.payload};
        }
        default : {
            return state;
        };
    };
};