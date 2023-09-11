const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        cpassword: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0,        // 0 means false, 1 means true
        },
        // Add a field for the token's expiration date
        tokenExpirationDate: {
            type: Date,
            default: null, // Initialize it as null
        },
        verified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            default: null,
        },

    },
    { timestamps: true }         // whenever a new user added, created time add hujaye ga
);


// Did in helpers

// userSchema.pre("save", async function (next) {
//     console.log("Test")
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 10)
//         this.cpassword = await bcrypt.hash(this.cpassword, 10)
//     } next()
// })


const User = new mongoose.model("user", userSchema)
module.exports = User
