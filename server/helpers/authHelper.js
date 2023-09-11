const bcrypt = require("bcrypt")

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword

    } catch (e) {
        console.log(e)
    }
}



const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

module.exports = { hashPassword, comparePassword }