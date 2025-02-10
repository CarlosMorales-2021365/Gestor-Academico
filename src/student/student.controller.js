import { hash, verify } from "argon2";
import Student from "./student.model.js"

export const deleteStudent = async (req, res) => {
    try{
        const { uid } = req.params

        const student = await Student.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Estudiante eliminado",
            student
        })
    }catch(err){
        return res.status(500).json({
            success: true,
            message: "Error al eliminar al estudiante",
            error: err.message
        })
    }
}

export const updateStudentPassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } = req.body

        const student = await Student.findById(uid)

        const matchO1dAndNewPassword = await verify(student.password, newPassword)

        if(matchO1dAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await Student.findByIdAndUpdate(uid, {password: encryptedPassword}, {new: true})

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

export const updateStudent = async (req, res) => {
    try{
        const { uid } = req.params;
        const data = req.body;

        const student = await Student.findByIdAndUpdate(uid, data, {new: true});

        res.status(200).json({
            msg: "estudiante actualizado",
            student
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualiza al estudiante",
            error: err.message
            
        })
    }
}

export const assignCursoToStudent = async (req, res) => {
    try {
      const { uid, id } = req.body;
      
      const student = await Student.findById(uid);
  
      if (!student) {
        return res.status(404).json({ message: "Estudiante no encontrado" });
      }

      if (student.courses.includes(id)) {
        return res.status(400).json({ message: "El estudiante ya esta asignado a este curso" });
      }
  
      if (student.courses.length >= 3) {
        return res.status(400).json({ message: "El estudiante ya fue asignado a 3 cursos" });
      }
  
      student.courses.push(id);
      await student.save();
  
      res.status(200).json({ 
        message: "Curso asignado correctamente", 
        student
     });
    } catch (err) {
      res.status(500).json({ 

        message: "Error al asignar el curso",
        error: err.message 
    });
    }
  };
  
  export const getStudentCurso = async (req, res) => {
    try {
      const { uid } = req.params;
  
      const student = await Student.findById(uid).populate("courses");
  
      if (!student) {
        return res.status(404).json({ message: "Estudiante no encontrado" });
      }
  
      res.status(200).json({
        message: `Cursos de estudiante ${student.name}`,
        courses: student.courses
      });
    } catch (err) {
      res.status(500).json({ 
        message: "Error al mostrar los cursos",
        error: err.message 
    });
    }
  };