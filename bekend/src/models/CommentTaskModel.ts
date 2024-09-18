import { CommentsTask, AutorComments } from "./modalTypes";
import {Schema, model} from "mongoose";


const AutorCommentsSchema = new Schema<AutorComments>({
    name: {
       type: String,
       required: true
    },

    avatar: {
       type: String, 
       required: true
    },

    chekLike: {
       type: Boolean,
       required: true
    },

    commentsArr: {
      type: [String]
    },

    id: {
      type: String,
      required: true
    }

})

const CommentModal = new Schema<CommentsTask>({
   title: {
     type: String,
     required: true
   },

   description: {
    type: String,
    required: true
   },

   like: {
    type: Number,
    required: true
   },

   authorId: {
      type: String,
      required: true
   },

   comments:{
     type: [AutorCommentsSchema]
   }
});

export default model<CommentsTask>("Comment", CommentModal, "Comment");

