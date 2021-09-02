import axios from "axios";
import { getMaxListeners } from "process";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "d196c569-ba00-4ae3-a39d-dc34389d469b"
    }
});

const proxy = axios.create({
    // withCredentials: true,
    baseURL: "http://localhost:5000/api/",
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "crossdomain": true 
    // },
});

type getUsersType = {
    items: Array<userType>,
    totalCount: number,
    error: string,
}

type userType = {
    id: string,
    name: string,
    photos: {
        small: string,
        large: string
    }
    status: string,
    followed: boolean
}

type followType = {
    resultCode: ResultCodesEnum,
    messages: Array<string>,
    data: {}
}

type unfollowType = {
    resultCode: ResultCodesEnum,
    messages: Array<string>,
    data: {}
}

type getUserAuthType = {
    data: {
        id: string,
        email: string,
        login: string,
        token: string
    }
    resultCode: number,
    messages: Array<string>,
}

type logType = {
    resultCode: ResultCodesEnum,
    messages: Array<string>,
    data: {
        id: string,
        email: string,
        login: string,
        token: string
    },
}


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaRequired = 10
}

const registerData = {
    email: "kozin@gmail.com",
    password: "password2",
    rememberMe: false,
    login: "vovka"
}

export const usersAPI = {
    regist() {
        return proxy.post<logType>(`register`, registerData, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data)
    },
    getUsers(currentPage = 1, pageSize = 5) {
        return proxy.get<getUsersType>(`users`)
            .then(response => response.data);
    },
    follow(userId: string) {
        return instance.post<followType>(`follow/${userId}`).then(response => response.data)
    },

    unfollow(userId: string) {
        return instance.delete<unfollowType>(`follow/${userId}`).then(response => response.data)
    },
    userInfo(userId: string) {
        console.warn('Obsolete method. Please prifileAPI object')
        return ProfileAPI.getProfile(userId);
    },
    getUserAuth() {
        return proxy.get<getUserAuthType>(`/auth/me`, {
            params: { userId: '6129fbd8ec114ea2874f92ca' }
        }).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
        return proxy.post<logType>(`login`, { email, password }, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data)
    },
    logout(userId: string) {
        return proxy.post<logType>(`logout`, { userId }, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data)
    },
    getFriends(isFollow: boolean, currentPage: number) {
        return instance.get<getUsersType>(`users?page=${currentPage}&friend=${isFollow}`).then(response => response.data);
    },
    getAll() {
        return proxy.get(`posts`).then(response => response.data);
    },
}

type getProfileType = {
    userId: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: getProfileContactsType,
    photos: getProfilePhotosType,
}

type getProfileContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
}

type getProfilePhotosType = {
    small: string,
    large: string
}

type updateStatusType = {
    resultCode: number
    messages: Array<string>,
    data: {}
}

type savePhotoType = {
    resultCode: number
    messages: Array<string>,
    data: {
        photos: {
            small: string,
            large: string
        }
    }
}

type sendProfileInfoType = {
    resultCode: number
    messages: Array<string>,
    data: {}
}

export const ProfileAPI = {
    getProfile(userId: string) {
        return proxy.get<getProfileType>(`profile`, { params: { userId: userId } }).then(response => response.data)
    },
    getUserStatus(userId: string) {
        return proxy.get<string>(`profile/status`, { params: { userId: userId } }).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<updateStatusType>('profile/status', { status: status }).then(response => response.data)
    },
    savePhoto(photoFile: string, userId: string) {
        const formData = new FormData();
        formData.append("avatar", photoFile);
        return proxy.post<savePhotoType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/formData'
            },
            params: {
                userId: userId
            }
        }).then(response => response.data)
    },
    deletePhoto(filename: string) {
        return proxy.delete<string>(`${filename}` )
    },
    sendProfileInfo(formData: any) {
        return instance.put<sendProfileInfoType>('profile', formData).then(response => response.data)
    },
    userPhoto(userId: string) {
        return proxy.get<getProfileType>(`profile/photo`, { params: { userId: userId } }).then(response => response.data)
    }
}

type getCaptchaUrlType = {
    url: string
}

export const SecurityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchaUrlType>('security/get-captcha-url').then(response => response.data)
    }
}

export default usersAPI;