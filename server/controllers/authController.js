const userModel = require("../models/userModel")
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require('crypto');

const registerController = async (req, res) => {
    try {
        const { name, email, password, cpassword, phone, address } = req.body;
        if (!name || !email || !password || !cpassword || !phone || !address) {
            return res.status(422).json({ error: "All fields are required" });
        }

        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(423).json({
                success: false,
                message: "This email address already exist",
            });
        }

        const hashedPassword = await hashPassword(password, cpassword)



        if (password === cpassword) {
            const user = new userModel({
                name, email, phone, address, password: hashedPassword, cpassword: hashedPassword
            })
            // Generate a random verification token
            const verificationToken = crypto.randomBytes(20).toString('hex');


            // Set the token expiration date (e.g., 24 hours from now)
            const tokenExpirationDate = new Date();
            tokenExpirationDate.setHours(tokenExpirationDate.getHours() + 24);

            // Save the verification token to the user document
            user.verificationToken = verificationToken;
            user.tokenExpirationDate = tokenExpirationDate;  // added new

            await user.save()

            // send email code
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SMTP_MAIL,
                    pass: process.env.SMTP_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.SMTP_MAIL,
                to: email,
                subject: 'Email Verification',
                html: `
        <p>Click <a href="http://localhost:3000/verify/${verificationToken}">here</a> to verify your email.</p>
      `,
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({
                message: 'Please check your email for verification.'
            });


            // res.status(201).send({
            //     success: true,
            //     message: "User Register Successfully",
            //     user,
            //   });
        }
        else {
            return res.status(402).json({ error: "Passwords doesnt match" })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Error in registration"

        })
    }
}






const loginController = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all the fields properly" })
        }

        const userLogin = await userModel.findOne({ email: email })
        if (!userLogin) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",

            });
        }

        if (!userLogin.verified) {
            return res.status(402).json({ error: 'Please verify your email first.' });
        }

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            // const match = await comparePassword(password, user.password);

            if (isMatch) {
                const token = jwt.sign({ _id: userLogin._id }, process.env.JWT_KEY, { expiresIn: "8d" })
                res.status(200).send({
                    success: true,
                    message: "login successfully",
                    userLogin: {
                        _id: userLogin._id,
                        name: userLogin.name,
                        email: userLogin.email,
                        phone: userLogin.phone,
                        adddress: userLogin.address,
                    },
                    token,
                });

            }

            else if (userLogin.password !== password) {
                res.status(400).json({ error: "Invalid password" })
            }
            else {
                res.status(400).send("Invalid details")
            }
        }

        // token
    }
    catch (e) { console.log(e) }

}

const verifyController = async (req, res) => {
    try {
        const { token } = req.params;

        // Find the user in the database based on the token
        const user = await userModel.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification token.' });
        }


        // Check if the token has already been used (user is already verified)
        if (user.verified) {
            return res.status(401).json({ message: 'Your Email has already been verified. Please Login.', });
        }

        // Check if the token has expired
        if (user.tokenExpirationDate && user.tokenExpirationDate < new Date()) {
            return res.status(402).json({ message: 'Token has expired.' });
        }

        // Update the user's isVerified field
        user.verified = true;
        // user.verificationToken = null;

        await user.save();
        return res.status(200).json({ message: 'Email verified successfully' });

    } catch (e) {
        res.status(500).json({ message: 'An error occurred while verifying the email.' });
    }
}


const testController = async (req, res) => {

    try {
        console.log("Protected Routes")
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }

}





module.exports = { registerController, loginController, testController, verifyController }