import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "d196c569-ba00-4ae3-a39d-dc34389d469b"
    }
});

const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },
    follow (userId) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/ /follow/${userId}`)
    },

    unfollow (userId) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/ /follow/${userId}`)
    }


}



export default usersAPI;

