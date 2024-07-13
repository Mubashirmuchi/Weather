import  service  from "../utils/service";
import { API } from "../config/api";
import { toast } from "react-toastify";

const AuthService = {
    login: async (params) => {
        console.log(params)
        try {
            const res = await service.post(API.LOGIN, { email: params.email, password: params.password });
            console.log("respp in service login",res.data)
            if (res?.data) {
                return res;
            }
        } catch (error) {
            return error;
        }
    },

    register: async (params = {}) => {
        try {
            console.log("ppparamsin auth ser",params)
            const res = await service.post(API.SIGNUP, params);
            console.log("reg", res);
            if (res) {
                return res;
            } else {
                throw new Error("something went wrong");
            }
        } catch (error) {
            return error;
        }
    },
    logout: async () => {
        try {
            const res = await service.post(API.LOGOUT);
            if (res?.data) {
                return res.data;
            } else {
                throw new Error("something went wrong");
            }
        } catch (error) {
            return error;
        }
    },


};

export default AuthService;