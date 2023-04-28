import axiosInstance from './AxiosJWT';

export default class UserProfile {
    static async initialize() {
        const userObj = {
            "id": 0,
            "name": "",
            "email": "",
            "address": "",
            "isAdmin": false,
            "loggedIn": false,
        }
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const response = await axiosInstance('user/verify');
                console.log("User Logged In!");
                console.log(response.data);
                userObj["id"] = response.data["id"];
                userObj["name"] = response.data["name"];
                userObj["email"] = response.data["email"];
                userObj["address"] = response.data["address"];
                userObj["isAdmin"] = response.data["isAdmin"];
                userObj["loggedIn"] = true;
                return userObj;
            } catch (error) {
                // Handle authentication error
                // remove token from local storage
                console.log("User Logged Out!");
                localStorage.removeItem('jwtToken');
                return userObj;
            }
        } else {
            console.log("User Logged Out!");
            localStorage.removeItem('jwtToken');
            return userObj;
        }
    }
}
  