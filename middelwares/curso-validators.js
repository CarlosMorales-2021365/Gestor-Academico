import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handle-errors.js";
import { cursoExists } from "../helpers/db-validators.js";

export const createCursoValidator = [
    body("teacher").notEmpty().withMessage("El profesor es requerido"),
    body("teacher").isMongoId().withMessage("No es un ID valido"),
    validarCampos,
    handleErrors
]

export const deleteCursoValidator = [
    param("id").isMongoId().withMessage("No es un ID valido"),
    param("id").custom(cursoExists),
    validarCampos,
    handleErrors
]

export const updateCursoValidator = [
    param("id", "No es un ID valido").isMongoId(),
    param("id").custom(cursoExists),
    validarCampos,
    handleErrors
]