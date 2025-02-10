import { hash, verify } from "argon2";
import Student from "../student/student.model.js"
import Teacher from "../teacher/teacher.model.js"
import { generateJWT } from "../../helpers/generate-jwt.js";

export const studentRegister = async (req, res) =>{
    try{
       const data = req.body
       let profilePicture = req.file ? req.file.filename : null;
       const encryptedPassword = await hash(data.password)
       data.password = encryptedPassword
       data.profilePicture = profilePicture

       const student = await Student.create(data)
       return res.status(201).json({
        message: "Student has been created",
        name: student.name,
        carné: student.carne
       });
    }catch(err){
        return res.status(500).json({
            message: "Student registration failed",
            error: err.message
        });
    }
}

export const teacherRegister = async (req, res) => {
    try{
        const data = req.body
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const teacher = await Teacher.create(data);
        
        return res.status(201).json({
        message: "Teracher has been created",
        name: teacher.name,
        email: teacher.email
        });
    }catch(err){
        return res.status(500).json({
            message: "Teacher registration failed",
            error: err.message
        });
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await Student.findOne({
            $or:[{email: email}, {username: username}]
        }) || await Teacher.findOne({
            $or:[{email: email}, {username: username}]
        })
        if(!user){
            return res.status(400).json({
                message: "Credenciales invalidas",
                error:"No existe el usuario o correo ingresados"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Credenciales invalidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        })
    }
}