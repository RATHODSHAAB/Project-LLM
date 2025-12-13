const User = require("../models/user");
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const z = require('zod');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


//Here we are not doing zod validation ! that's also very important part 
const signupSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
});

exports.signup  = async (req,res) => {
    try {
         const parsed = signupSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(403).json({
                error: "Sent Lesson is not correct!"
            });
        }
        //Getting the {username} , email , passsowrd from the body of the request
    const {username, email , password } = req.body;

    //Checking if user exist or not => I think this is not needed 
    const exisitingUser = await User.findOne({
        $or : [{username},{email} ]
    })
    console.log(exisitingUser);
    if(exisitingUser) {
        return  res.status(400).json({ error : "Username already taken" });
    }
    //Hashig the password as they are decoded/extracted from the request->body
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
        username:username,
        email:email,
        password: hashedPassword
    });

    
    const token = jwt.sign({
        userId : newUser._id , username: newUser.username
    }, JWT_SECRET,
    {expiresIn:"1h"})


    return res.status(201).json({ message : "User Created successsfully" , token, 
        User: {
            id: newUser._id,
            username: newUser.username,
        }
    });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error while Signing up:((" });
    }
}




//Sign in Routes
exports.signin = async (req,res) => {
    try {
        const {username , password} = req.body;

    //Checking if user exist or not => I think this is not needed 
    const exisitingUser = await User.findOne({
      username:username
    })
    if(!exisitingUser) {
        return  res.status(400).json({ error : "Invalid Username or password!" });
    }

    //Validating Password
    const isPasswordValid  = await bcrypt.compare(password, exisitingUser.password);

    //If password is invalid 
   if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password credentials" });
    }

    const token  =  jwt.sign({
        userId: exisitingUser._id, username: exisitingUser.username
    },JWT_SECRET, {expiresIn:"24h"})

    return res.status(200).json({ 
    message : "User Sign-In successsfully",
    token: token 
});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error while Signing In" });
    }
}

exports.logout = async (req,res) => {
    res.status(200).json({
        messgae: "Logout Successfully!"
    })
}
