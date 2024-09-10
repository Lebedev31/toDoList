import {Schema, model} from "mongoose";
import { TaskDocument } from "./modalTypes";

const TaskSchema = new Schema({
    nameTask: {
        type: String,
        required: true
    },

    dateOfCompletion: {
        type: String,
    },

    dataOfCreation: {
        type : String,
        required: true
    },

    reminder: {
        type: Boolean,
        required: true
    },

    contentTask: {
        type: String,
    },

    imgTaskPath:{
        type: String
    },

    categoryTask: {
        type: String
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }


});

const TaskModel = model('Task', TaskSchema, 'Task');

export default TaskModel;