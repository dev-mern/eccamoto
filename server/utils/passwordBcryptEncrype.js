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