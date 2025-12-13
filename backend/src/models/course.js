import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
    },
    thumbnail:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    instructorId: {
        type:String,
        required:true
    }
    
})

export default model('Course',courseSchema);