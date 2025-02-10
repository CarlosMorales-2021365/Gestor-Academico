import { Schema, model } from "mongoose";

const teacherSchema = Schema({
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
        enum: ["TEACHER_ROLE"]
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

teacherSchema.methods.toJSON = function(){
    const { __v, password, _id, ...teacher} = this.toObject()
    teacher.uid = _id
    return teacher
}

export default model('Teacher', teacherSchema)
