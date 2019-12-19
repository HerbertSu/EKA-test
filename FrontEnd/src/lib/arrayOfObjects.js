export const contains = (id, objectArray) => {
    for(let i = 0; i < objectArray.length; i++){
        if(objectArray[i].id == id){
            return i;
        };
    };
    return null;
};