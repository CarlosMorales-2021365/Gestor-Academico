import { Router } from "express";
import { createCurso, updateCurso, deleteCurso, getCurso } from "./curso.controller.js";
import { createCursoValidator, updateCursoValidator, deleteCursoValidator } from "../../middelwares/curso-validators.js";

const router = Router();

router.post("/createCurso", createCursoValidator, createCurso);

router.put("/updateCurso/:id", updateCursoValidator, updateCurso)

router.delete("/deleteCurso/:id", deleteCursoValidator, deleteCurso)

router.get("/:uid", getCurso)


export default router;