import { hash, verify } from "argon2";
import Teacher from "./teacher.model.js"

export const deleteTeacher = async (req, res) => {
    try{
        const { uid } = req.params

        const teacher = await Teacher.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Profesor eliminado",
            teacher
        })
    }catch(err){
        return res.status(500).json({
            success: true,
            message: "Error al eliminar al profesor",
            error: err.message
        })
    }
}

export const updateTeacherPassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } = req.body

        const teacher = await Teacher.findById(uid)

        const matchO1dAndNewPassword = await verify(teacher.password, newPassword)

        if(matchO1dAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await Teacher.findByIdAndUpdate(uid, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada"
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la contraseña",
            error: err.message
        })
    }
}

export const updateTeacher = async (req, res) => {
    try{
        const { uid } = req.params;
        const data = req.body;

        const teacher = await Teacher.findByIdAndUpdate(uid, data, {new: true});

        res.status(200).json({
            msg: "Profesor actualizado",
            teacher
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualiza al profesor",
            error: err.message
            
        })
    }
}