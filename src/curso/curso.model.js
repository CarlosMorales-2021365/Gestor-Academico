import { Schema, model } from "mongoose";
import { type } from "os";

const cursoSchema = Schema({
    name:{
        type: String,
        required: [true, "The name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        maxLength: [100, "Description cannot exceed 100 characters"]
    },
    start:{
        type: String,
        required: true
    },
    end:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    teacher:{
        type: Schema.ObjectId,
        ref: 'Teacher',
        require: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model('Curso', cursoSchema)