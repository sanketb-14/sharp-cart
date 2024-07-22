import User from "../models/userModel"

// Register user

export const register = async(req,res,next) => {
    try {
        const { name, email, password ,passwordConfirm } = req.body

        const newUser = await User.create({
            name,
            email,
            password,
            passwordConfirm
        })
        res.status(201).json({ message: "User registered successfully", user: newUser })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
        
        
    }
}