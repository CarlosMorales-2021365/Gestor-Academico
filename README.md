# Gestor-Academico

Esta API esta diseñada para gestionar a los estudiantes, profesores y los cursos de una institucion educativa. Incluye funcionalidades para crea actualizar cursos asi comom permitir que los alumnos visualicen los cursos a los que estan inscritos.

## Variables de Entorno

Cree un archivo `.env` en el directorio de raíz y agregue la siguinetes variables 

```
PORT=<Tu puerto para el servidor>
URI_MONGO=<tu cadena de coneccion a mongodb>
SECRETORPRIVATEKEY=<tu secreto JWT>
```

## Enpoints de la API

### Autenticación

- **Registrar Estudiante**
  - **URL:**`/gestorAcademico/v1/auth/studentRegister`
  - **Método:**`POST`
  - **Cuerpo:**
```json
  {
    "name":"string",
    "surname":"string",
    "carne":"string",
    "username":"string",
    "email":"string",
    "password":"string",
    "profilePicture":"file",
    "role":"string"
  }
  ```
- **Registrar Profesor**
  - **URL:**`/gestorAcademico/v1/auth/teacherRegister`
  - **Método:**`POST`
  - **Cuerpo:**
  ```json
  {
    "name":"string",
    "surname":"string",
    "username":"string",
    "email":"string",
    "password":"string",
    "profilePicture":"file",
    "role":"string"
  }
  ```

- **Iniciar sesión**
  - **URL:**`/gestorAcademico/v1/auth/login`
  - **Método:**`POST`
  - **Cuerpo:**
  ```json
  {
    "username":"string",
    "password":"string"
  }
  ```

### Estudiante

- **Eliminar Estudiante**
  - **URL:**`/gestorAcademico/v1/student/deleteStudent/:uid`
  - **Método:**`DELETE`

- **Actualizar Contraseña del Estudiante**
  - **URL:**`/gestorAcademico/v1/student/updateStudentPassword/:uid`
  - **Método:**`PATCH`
  ```
    {
    "newPassword":"String"
    }
  ```

- **Actualizar Estudiante**
  - **URL:**`/gestorAcademico/v1/student/updateStudent/:uid`
  - **Método:**`PUT`
```json
  {
    "name":"string",
    "surname":"string",
    "carne":"string",
    "username":"string",
    "email":"string",
    "password":"string",
  }
  ```

- **Asignar cursos al Estudiante**
  - **URL:**`/gestorAcademico/v1/student/assingCurso`
  - **Método:**`POST`
  ```json
  {
  "uid": "string", 
  "id": "string"
  }
  ```
  -uid = id del estudiante
  -id = id del curso

  - **Listar cursos del Estudiante**
  - **URL:**`/gestorAcademico/v1/student/CursosDelEstudiante/:uid`
  - **Método:**`GET`


### Profesor

  - **Eliminar Profesor**
  - **URL:**`/gestorAcademico/v1/teacher/deleteTeacher/:uid`
  - **Método:**`DELETE`

- **Actualizar Contraseña del Profesor**
  - **URL:**`/gestorAcademico/v1/teacher/updateTeacherPassword/:uid`
  - **Método:**`PATCH`
  ```
    {
    "newPassword":"String"
    }
  ```

- **Actualizar Profesor**
  - **URL:**`/gestorAcademico/v1/teacher/updateTeacher/:uid`
  - **Método:**`PUT`
   ```json
  {
    "name":"string",
    "surname":"string",
    "username":"string",
    "email":"string",
    "password":"string",
  }
  ```

### Cursos

- **Crear Cursos**
  - **URL:**`/gestorAcademico/v1/curso/createCurso`
  - **Método:**`POST`
  - **Cuerpo:**
  ```json
    {
    "name":"string",
    "description":"string",
    "start":"string",
    "end":"string",
    "teacher":"string"
    }
  ```

- **Actualizar Curso**
  - **URL:**`/gestorAcademico/v1/curso/updateCurso/:id`
  - **Método:**`PUT`
   ```json
   {
    "name":"string",
    "description":"string",
    "start":"string",
    "end":"string",
    }
  ```

- **Eliminar Curso**
  - **URL:**`/gestorAcademico/v1/curso/deleteCurso/:id`
  - **Método:**`DELETE`

  - **Listar cursos de un profesor en especifico**
  - **URL:**`/gestorAcademico/v1/curso/:uid`
  - **Método:**`GET`





