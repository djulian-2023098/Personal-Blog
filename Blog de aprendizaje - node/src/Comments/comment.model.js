import { Schema, model } from "mongoose";

const commentSchema = Schema(
    {
        username:{
            type: String,
            require: [true, 'Username is required']
        },
        description:{
            type: String,
            require: [true, 'Description is required']
        },
        date:{
            type: Date,
            default: Date.now
        },
        publication:{
            type: Schema.Types.ObjectId,
            ref: "Publication",
            required: true
        }
    }
)

export default model ('Comments', commentSchema)