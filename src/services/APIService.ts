import axios from "axios";

import { Actions } from "react-native-router-flux"
import { UserService } from "./UserService";




UserService.getJWT().then(res=>{
    axios.defaults.headers.common["Authorization"] =  `Bearer ${res}`
    console.log(res);
})



axios.interceptors.request.use(
    res => res,
    err => err
);


axios.interceptors.response.use(
    res => res,
    err =>{
        
        console.log(err.response);
        if(err.response.status ==401){
            UserService.setJWT("").then(res =>{
                
               return  Actions.login();
                
            })
            return Promise.reject(err);        }
    }
)
export const  getAxios = async () => {
    var jwt = await  UserService.getJWT();
    axios.defaults.headers.common["Authorization"] =  `Bearer ${jwt}`
    return axios;
}

export default getAxios();