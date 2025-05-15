import { Schema, model } from "mongoose";

const publicationsSchema = Schema(
    {
        title:{
            type: String,
            required: [true, 'Title is required']
        },
        description:{
            type: String,
            required: [true, 'Description is required'],
            maxLength: [75, `Can't be overcome 75 characters`]
        },
        course:{
            type: String,
            required: [true, 'Course is required'],
            uppercase: true,
            enum: ['TALLER', 'TECNOLOGÍA', 'PRÁCTICA SUPERVISADA']
        },
        date:{
            type: Date,
            default: Date.now
        }
    }
)

export default model ('Publication', publicationsSchema)