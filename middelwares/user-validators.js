import { body, param } from "express-validator";
import { emailExist, usernameExist, carneExsist, studentExists, teacherExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";

export const registerStudentValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("username").not().isEmpty().withMessage("Username is required"),
    body("carne").not().isEmpty().withMessage("Carné is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("carne").custom(carneExsist),
    body("email").custom(emailExist),
    body("username").custom(usernameExist),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const deleteStudentValidator = [
    param("uid").isMongoId().withMessage("No es un ID valido"),
    param("uid").custom(studentExists),
    validarCampos,
    handleErrors
]

export const updateStudentPasswordValidator = [
    param("uid").isMongoId().withMessage("No es un ID valido"),
    param("uid").custom(studentExists),
    body("newPassword").isLength({min: 8}).withMessage("EL password debe tener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const updateStudentValidator = [
    param("uid", "No es un ID valido").isMongoId(),
    param("uid").custom(studentExists),
    validarCampos,
    handleErrors
]

export const registerTeacherValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("username").not().isEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Name is required"),
    body("email").custom(emailExist),
    body("username").custom(usernameExist),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const deleteTeacherValidator = [
    param("uid").isMongoId().withMessage("No es un ID valido"),
    param("uid").custom(teacherExists),
    validarCampos,
    handleErrors
]

export const updateTeacherPasswordValidator = [
    param("uid").isMongoId().withMessage("No es un ID valido"),
    param("uid").custom(teacherExists),
    body("newPassword").isLength({min: 8}).withMessage("EL password debe tener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const updateTeacherValidator = [
    param("uid", "No es un ID valido").isMongoId(),
    param("uid").custom(teacherExists),
    validarCampos,
    handleErrors
]


export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]