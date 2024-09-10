export interface FormValue {   // данные отправлемые при регистрации на сервер
    login: string,
    password: string,
    name: string
}

export interface ResponseRegistration { // данные получаемые при успешной регистрации
    registration: boolean
}

export interface CustomError { // ошибка при неккоректной регистрации
    data: {
        error: string
    },

    status: number
}

export interface AuthValue extends Pick<FormValue, 'login'|'password'>{} // данные отправляемые при регистрации

export interface ResponseAuth {  // данные получаемые при успешной авторизации
    auth: boolean;
    token: string
}

export interface UploadCreateTask {
    name: string,
    dateCompletion: string;
    description: string;
    check: string;
    image?: Blob;
    now: string;
    colorCategoryButton: string;
}

export interface ResponseArrayTask {
categoryTask: string;
contentTask: string;
dateOfCompletion: string;
dataOfCreation: string
imgTaskPath: string;
nameTask: string;
reminder: boolean;
user: string;
_id: string;
}

export interface TaskData{
    arrTask: ResponseArrayTask[];
}

export type PersonalAreaData = 'Имя' | 'Фамилия' | 'Ник' | 'Email';

export type PersonalAreaTypeRequest = Partial<Record<PersonalAreaData, string>>;

export type PersonalAreaObject = {
    namePersonal: string;
    surname: string;
    nikName: string;
    email: string;
}

export type PersonalAreaTypeResponse = {
  personalArea: PersonalAreaObject;
};

