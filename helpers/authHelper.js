import bcrypt from 'bcrypt'

export const comparePassword = async (password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword)
}
export const hashPassword = async(password)=>{
    try {
        const saltRound = 10;
        const hashedPassowrd = await bcrypt.hash(password,saltRound)
        return hashedPassowrd
    } catch (error) {
        console.log(error)
    }
};

export default hashPassword;