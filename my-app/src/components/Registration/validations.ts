export const inputLogin = {
    required: 'Поле обязательно для заполнения',
    minLength: {
        value: 5,
        message: "Минимальное значение 5 символов"
    },

    maxLength: {
        value: 70,
        message: 'Максимальное значение 70 символов'
    },

    pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: 'Неправильный формат email'
    }

}


export const inputUserName = {
    required: 'Поле обязательно для заполнения',
    minLength: {
        value: 5,
        message: "Минимальное значение 5 символов"
    },

    maxLength: {
        value: 70,
        message: 'Максимальное значение 70 символов'
    }

}

export const inputPassword = {
    required: 'Поле обязательно для заполнения',
    minLength: {
        value: 8,
        message: 'Минимальное значение 8 символов'
    }
}