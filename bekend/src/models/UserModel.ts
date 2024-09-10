import {Schema, model} from "mongoose";

const UserShema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    
    name: {
        type: String,
        required: true
    },

    personalArea: {
        type: Object,
        namePersonal: {
            type: String
        },
        surname: {
            type: String
        },

        nikName: {
            type: String
        }, 

        email: {
            type: String
        },

        logo: {
            type: String
        }
    }

});
 

const UserModal = model('User', UserShema, 'User');

export default UserModal;