import Student from "../src/student/student.model.js"
import Teacher from "../src/teacher/teacher.model.js"
import Curso from "../src/curso/curso.model.js"

export const emailExist = async (email = "") =>{
    const existe = await Student.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
        }
}

export const usernameExist = async (username = "") =>{
    const existe = await Student.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
        }
}

export const carneExsist = async (carne = "") =>{
    const existe = await Student.findOne({carne})
    if(existe){
        throw new Error(`The carné ${carne} is already registered`)
        }
}

export const studentExists = async (uid = "") =>{
    const existe = await Student.findById(uid);
    if(!existe){
        throw new Error(" No existe el estudiante con el id proporsionado")
    }
}

export const teacherExists = async (uid = "") =>{
    const existe = await Teacher.findById(uid);
    if(!existe){
        throw new Error(" No existe el profesor con el id proporsionado")
    }
}

export const cursoExists = async (id = "") =>{
    const existe = await Curso.findById(id);
    if(!existe){
        throw new Error(" No existe el curso con el id proporsionado")
    }
}