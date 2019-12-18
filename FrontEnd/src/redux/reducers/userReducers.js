export const userReducer = (state={userName: null}, action) => {
    switch(action.type){
        case "SET_USER_NAME": {
            return {...state, userName: action.payload};
        }
        default : {
            return state;
        };
    };
};