import { Document, ObjectId } from 'mongoose';

export interface User  {
    login: string,
    password: string,
    name: string,
    personalArea?: {
        namePersonal: string,
        surname: string,
        nikName: string,
        email: string,
        logo: string
    }
}

export interface UserDocument extends User, Document {
    _id: ObjectId
}

export interface Task {
    nameTask: string,
    dateOfCompletion: string;
    contentTask: string;
    reminder: boolean;
    dataOfCreation: string;
    categoryTask: string;
    imgTaskPath: string;
    user: string;
}

export interface BodyTask{
    now: string;
    description: string;
    colorCategoryButton: string;
    name: string;
    dateCompletion: string;
    check: string;
}

export interface TaskDocument extends Task, Document {
    _id: string
}

