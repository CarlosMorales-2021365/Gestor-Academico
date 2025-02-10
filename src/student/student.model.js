import { Schema, model, version } from "mongoose";

const studentSchema = Schema({
    name:{
        type: String,
        required: [true, "The name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "The surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    carne:{
        type: String,
        minLength: 7,
        maxLength: 7,
        required: [true, "The carné is required"],
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: [true, "The email is required "],
        unique: true
    },
    password:{
        type: String,
        required: [true, "The password is required"]
    },
    profilePicture:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE"],
        default: 'STUDENT_ROLE'
    },
    courses: {
        type: [Schema.ObjectId],
        ref: "Curso",
        validate: {
          validator: function (value) {
            return value.length <= 3;
          },
          message: "Un estudiante no puede tener mas de 3 cusrsos asignados"
        }
    },  
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

studentSchema.methods.toJSON = function(){
    const { __v, password, _id, ...student} = this.toObject()
    student.uid = _id
    return student
}

export default model('Student', studentSchema)

