const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel");
const User = require("../models/userModel");


const requireSignin = async (req, res, next) => {
    try {
        // tokens header mein huta so we get it in .headers.authorization
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_KEY);

        req.user = decode //id mil jaye gy (decrypt hugya)
        next();
    }
    catch (e) { console.log(e) }

}


// admin access

const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)

        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};

module.exports = { requireSignin, isAdmin }