import { Router } from "express";
import { deleteTeacher, updateTeacherPassword, updateTeacher} from "./teacher.controller.js";
import { deleteTeacherValidator, updateTeacherPasswordValidator, updateTeacherValidator } from "../../middelwares/user-validators.js";

const router = Router()

router.patch("/updateTeacherPassword/:uid", updateTeacherPasswordValidator,updateTeacherPassword)

router.put("/updateTeacher/:uid",updateTeacherValidator, updateTeacher)

router.delete("/deleteTeacher/:uid", deleteTeacherValidator, deleteTeacher)
 
export default router