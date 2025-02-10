import { Router } from "express";
import {studentRegister, teacherRegister, login} from "./auth.controller.js";
import { registerStudentValidator,registerTeacherValidator , loginValidator} from "../../middelwares/user-validators.js";
import { uploadProfilePicture } from "../../middelwares/multer-upload.js";
import { deleteFileOnError } from "../../middelwares/delete-file-on-error.js";

const router = Router()

router.post(
    "/studentRegister",
     uploadProfilePicture.single("profilePicture"),
     registerStudentValidator,
     deleteFileOnError,
     studentRegister 
)

router.post(
    "/teacherRegister",
    uploadProfilePicture.single("profilePicture"),
    registerTeacherValidator,
    deleteFileOnError,
    teacherRegister
)

router.post(
    "/login",
    loginValidator,
    login
)



export default router