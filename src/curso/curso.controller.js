import Teacher from "../teacher/teacher.model.js";
import Student from "../student/student.model.js"
import Curso from "../curso/curso.model.js";

export const createCurso = async (req, res) => {
    try{
        const data = req.body;

        const teacher = await Teacher.findOne({ _id: data.teacher });
        if (!teacher){
            return res.status(404).json({
                success: false,
                msg:"No se encontro al profesor"
            });
        }

       const curso = new Curso({ ...data});
       await curso.save();

       return res.status(200).json({
        success:true,
        msg: "Curso creado Exitosamente"
       });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Error al crear el curso",
            error
        });
    }
};


export const updateCurso = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;

        const curso = await Curso.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            msg: "Curso actualizado",
            curso
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualiza el curso",
            error: err.message
            
        })
    }
}

export const deleteCurso = async (req, res) => {
    try{
        const { id } = req.params

        const curso = await Curso.findByIdAndUpdate(id, {status: false}, {new: true})

        await Student.updateMany(
            { courses: id },
            { $pull: { courses: id } }
          );

        return res.status(200).json({
            success: true,
            message: "Curso eliminado",
            curso
        })
    }catch(err){
        return res.status(500).json({
            success: true,
            message: "Error al eliminar el curso",
            error: err.message
        })
    }
}

export const getCurso = async ( req, res) => {
    try{
        const { uid } = req.params;
        const { limite = 5, desde = 0 } = req.query
        const query = { teacher: uid, status: true}

        const [total, curso ] = await Promise.all([
            Curso.countDocuments(query),
            Curso.find(query)
                .skip(Number(desde))
                .limit(Number(limite)) 
        ])

        return res.status(200).json({
            success: true,
            total,
            curso
        })
    }catch(err){
        return res.ststus(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: err.message
        })
    }
}
