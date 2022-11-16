import bcrypt from "bcrypt";

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

export const makePasswordHash = async(password) =>{
    return bcrypt.hashSync(password,saltRounds);
}
export const comparePasswordHash = async(password,hashPassword) =>{
    return bcrypt.compareSync(password,hashPassword);
}



// generate unique id checking by list of IDs
const makeRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// generate a unique integer id comparing exist list
export const generateUniqueId = (existList=[],min,max) =>{
    if (existList.length > (max - min - 0)) {  
        return null;
    }
    // check if length in one third of the exist list, then do looping
    const threeFourthPortion = max - (max/4);
    if (threeFourthPortion < existList.length) {
        // loop the exist array from min length
            // way 1: check if exist arr length is below 90%; then loop from i=0
        if (((existList.length * 100) / (max-min+1)) < 90) {
            for(let i=min; i<max; i++){
                if (existList.includes(i)) {
                    continue;
                }else{
                    return i;
                }
            }
            return null;
        }else{
            // way 2: check if exist arr length is over 90%; then loop from i=max
            for(let i=max; i>min; i--){
                if (existList.includes(i)) {
                    continue;
                }else{
                    return i;
                }
            }
            return null;
        }
    }

    const id = makeRandomInteger(min,max);
    if (existList.includes(id)) {
        return generateUniqueId(existList,min,max);
    }

    return id;
}