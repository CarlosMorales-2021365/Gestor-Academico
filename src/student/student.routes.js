import { Router } from "express";
import { updateStudentPassword, updateStudent, deleteStudent, assignCursoToStudent, getStudentCurso  } from "./student.controller.js";
import { updateStudentPasswordValidator, updateStudentValidator, deleteStudentValidator } from "../../middelwares/user-validators.js";

const router = Router()

router.patch("/updateStudentPassword/:uid", updateStudentPasswordValidator ,updateStudentPassword)

router.put("/updateStudent/:uid",updateStudentValidator,updateStudent)

router.delete("/deleteStudent/:uid", deleteStudentValidator, deleteStudent)

router.post("/assingCurso", assignCursoToStudent)

router.get("/CursosDelEstudiante/:uid", getStudentCurso)

export default router