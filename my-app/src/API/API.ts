import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "d196c569-ba00-4ae3-a39d-dc34389d469b"
    }
});

type getUsersType = {
    items: Array<userType>,
    totalCount: number,
    error: string,
}

type userType = {
    id: Number,
    name: string,
    status: string,
    photos: { small: string, large: string },
    folowed: boolean
}

type followType = {
    resultCode: number,
    messages: Array<string>,
    data: {}
}
type unfollowType = {
    resultCode: number,
    messages: Array<string>,
    data: {}
}
type getUserAuthType = {
    data: {
        id: number,
        email: string,
        login: string,
    }
    resultCode: number,
    messages: Array<string>,
}
type loginType = {
    resultCode: number,
    messages: Array<string>,
    data: {},
}
type logoutType = {
    resultCode: number,
    messages: Array<string>,
    data: {},
}
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(userId: number) {
        return instance.post<followType>(`follow/${userId}`).then(response => response.data)
    },

    unfollow(userId: number) {
        return instance.delete<unfollowType>(`follow/${userId}`).then(response => response.data)
    },
    userInfo(userId: number) {
        console.warn('Obsolete method. Please prifileAPI object')
        return ProfileAPI.getProfile(userId);
    },
    getUserAuth() {
        return instance.get<getUserAuthType>(`/auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
        return instance.post<loginType>(`auth/login`, { email, password, rememberMe, captcha }).then(response => response.data)
    },
    logout() {
        return instance.delete<logoutType>(`auth/login`).then(response => response.data)
    },
    getFriends(isFollow: boolean) {
        return instance.get<getUsersType>(`users?friend=${isFollow}`).then(response => response.data);
    }
}

type getProfileType = {
    userId: number,
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

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<getProfileType>(`profile/${userId}`).then(response => response.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<updateStatusType>('profile/status', { status: status }).then(response => response.data)
    },
    savePhoto(photoFile: string) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/formData'
            }
        })
    },
    sendProfileInfo(formData: any) {
        return instance.put('profile', formData);
    },
    userPhoto(userId: number) {
        return instance.get(`profile/${userId}`);
    }
}

export const SecurityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url');
    }

}


export default usersAPI;

